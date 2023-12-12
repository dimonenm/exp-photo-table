import { app, BrowserWindow, dialog, ipcMain, IpcMainInvokeEvent } from 'electron';
import fs, { existsSync, mkdirSync, readFileSync, writeFileSync, writeFile } from 'fs'
import path from 'path'
import { IAutoSaveSettings, ISendImgsData } from './interfaces/interfaces';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    title: 'photo-table',
    height: 750,
    width: 1100,
    minHeight: 750,
    minWidth: 1100,
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#343a40',
      symbolColor: '#fff',
      height: 20
    },
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools({ mode: 'detach' });

  ipcMain.handle('getSettings', getSettingsHandler)
  ipcMain.handle('selectImages', selectImagesHandler)
  ipcMain.handle('isAutoSaveExist', isAutoSaveExistHandler)


  // ipcMain.on('renderer_to_main', (event, type, msg) => {
  //   if (type === 'btnAction') {
  //     if (msg === 'maximize') {
  //       mainWindow.maximize()
  //     }
  //     if (msg === 'unmaximize') {
  //       mainWindow.unmaximize()
  //     }
  //     if (msg === 'minimize') {
  //       mainWindow.minimize()
  //     }
  //   }
  // })

  function getSettingsHandler(): string {
    const directory = path.join(app.getPath('userData'), 'settings');
    const file = path.join(directory, `settings.json`)

    if (!existsSync(directory)) {
      mkdirSync(directory)
    }

    if (!existsSync(file)) {
      writeFileSync(file, '{"address": "Адрес не указан", "executors": [], "note": "Примечание: не указано", "official_status": "специалист", "tel": "Телефон не указан", "unit": "Подразделение не указано", "zip_code": "Почтовый индекс не указан"}', { flag: 'wx' })
    }

    return JSON.parse(readFileSync(file, { encoding: 'utf8' }))
  }

  async function selectImagesHandler() {

    const arr: ISendImgsData[] = []

    const { filePaths } = await dialog.showOpenDialog({
      filters: [
        { name: 'All Files', extensions: ['*'] },
        { name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'gif'] }
      ],
      properties: ['openFile', 'multiSelections']
    })

    for (const item of filePaths) {
      const name: RegExpMatchArray = item.match(/[\][a-zA-Z0-9]+[.][a-zA-Z]+/)

      arr.push({ name: name[0], buffer: fs.readFileSync(item), data: '' })
    }

    autoSaveImages(arr)

    return arr
  }

  function autoSaveImages(imgsDataArr: ISendImgsData[]): void {

    const directory = path.join(app.getPath('userData'), 'autosave');
    const date = (+Date.now()).toString()
    const autoSaveSettings: IAutoSaveSettings = {
      date,
      imagesNames: [],
      imagesUrls: []
    }

    if (!existsSync(directory)) {
      mkdirSync(directory)
    }

    imgsDataArr.forEach(item => {
      const file = path.join(directory, item.name)

      autoSaveSettings.imagesNames.push(item.name)
      autoSaveSettings.imagesUrls.push(file)

      writeFile(file, item.buffer, err => {
        if (err) {
          console.log(err.message);
          throw err;
        }
      })
    })
    
    writeFile(path.join(directory, 'autoSaveSettings.json'), JSON.stringify(autoSaveSettings), err => {
      if (err) {
        console.log(err.message);
        throw err;
      }
    })
  }

  function isAutoSaveExistHandler(): IAutoSaveSettings | null {
    const directory = path.join(app.getPath('userData'), 'autosave');
    const file = path.join(directory, `autoSaveSettings.json`)

    if (existsSync(file)) {
      const autoSaveSettings = JSON.parse(readFileSync(file, { encoding: 'utf8' }))
      return autoSaveSettings
    } else {
      return null     
    }
  }

  async function setSettingsHandler(event: IpcMainInvokeEvent, settings: string) {
    console.log(JSON.stringify(settings));
    return 'ok'
  }

  // ipcMain.handle('renderer_to_main', handleGetSettings)
  // ipcMain.handle('getSettings', handleGetSettings)
  // ipcMain.handle('setSettings', handleSetSettings)
}

const subscribeForAppEvents = (): void => {
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
}

app.whenReady().then(() => {
  subscribeForAppEvents()
  createWindow()
  // console.log(process.versions)
})
