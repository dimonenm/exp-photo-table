import { app, BrowserWindow, dialog, ipcMain, IpcMainInvokeEvent } from 'electron';
import fs from 'fs'

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
    // titleBarOverlay: {
    //   color: '#343a40',
    //   symbolColor: '#fff',
    //   height: 20
    // },
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools({mode: 'detach'});

  ipcMain.on('renderer_to_main', (event, type, msg) => {
    console.log('renderer_to_main: ipcMain.on');
    if (type === 'btnAction') {
      if (msg === 'maximize') {
        mainWindow.maximize()
      }
      if (msg === 'unmaximize') {
        mainWindow.unmaximize()
      }
      if (msg === 'minimize') {
        mainWindow.minimize()
      }
    }
  })

  async function handleFileOpen() {
    const { filePaths } = await dialog.showOpenDialog({
      filters: [
        { name: 'All Files', extensions: ['*'] },
        { name: 'Images', extensions: ['jpg', 'png', 'gif'] }
      ],
      properties: ['openFile', 'multiSelections']
    })

    const arrOfImages: Buffer[] = []

    for (const item of filePaths) {
      arrOfImages.push(await new Promise((resolve) => {
        fs.readFile(item, (err, data) => { resolve(data) })
      }).then((data: Buffer): Buffer => data))
    }

    console.log('arrOfImages: ', arrOfImages);
    return arrOfImages
  }
  async function handleGetSettings(event: IpcMainInvokeEvent, args: [string]) {
    const arr = [...args]
    return 'ok'
  }

  ipcMain.handle('dialog:openFile', handleFileOpen)
  ipcMain.handle('renderer_to_main', handleGetSettings)
}
const subscribeForAppEvents = (): void => {
  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
}

app.whenReady().then(() => {
  subscribeForAppEvents()
  createWindow()
})
