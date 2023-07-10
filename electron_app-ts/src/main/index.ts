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
  mainWindow.webContents.openDevTools({ mode: 'detach' });

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
    // console.log('filePaths: ', filePaths);

    // console.log('buffer: ', fs.readFileSync(filePaths[0]).length / 1000);
    // console.log('ascii: ', fs.readFileSync(filePaths[0], { encoding: 'ascii' }).length / 1000);
    // console.log('base64: ', fs.readFileSync(filePaths[0], { encoding: 'base64' }).length / 1000);
    // console.log('base64url: ', fs.readFileSync(filePaths[0], { encoding: 'base64url' }).length / 1000);
    // console.log('binary: ', fs.readFileSync(filePaths[0], { encoding: 'binary' }).length / 1000);
    // console.log('hex: ', fs.readFileSync(filePaths[0], { encoding: 'hex' }).length / 1000);
    // console.log('utf-8: ', fs.readFileSync(filePaths[0], { encoding: 'utf-8' }).length / 1000);
    // console.log('utf8: ', fs.readFileSync(filePaths[0], { encoding: 'utf8' }).length / 1000);
    // console.log('blob: ', new Blob([fs.readFileSync(filePaths[0])]).size / 1000);
    const arr: Buffer[] = []
    for (const item of filePaths) {
      arr.push(fs.readFileSync(item))
    }
    return arr


    // const arrOfImages: string[] = []
    // const arrOfImagesBuffer: Buffer[] = []

    // const startBase64 = Date.now();

    // for (const item of filePaths) {
    //   await new Promise((resolve) => {
    //     fs.readFile(item, (err, data) => { resolve(data.toString('base64')) })
    //   }).then((data: string): void => {
    //     arrOfImages.push(data)
    //   })
    // }

    // const endBase64 = Date.now();
    // const start = Date.now();
    
    // for (const item of filePaths) {
    //   await new Promise((resolve) => {
    //     fs.readFile(item, (err, data) => { resolve(data) })
    //   }).then((data: Buffer): void => {
    //     arrOfImagesBuffer.push(data)
    //   })
    // }

    // const end = Date.now();

    // console.log('buffer ', end - start);
    // console.log('base64 ', endBase64 - startBase64);
    // return arrOfImages
    // return [arrOfImagesBuffer]
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
