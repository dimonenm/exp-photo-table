import { app, BrowserWindow, dialog, ipcMain, IpcMainInvokeEvent } from 'electron';

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
  mainWindow.webContents.openDevTools();

  ipcMain.on('renderer_to_main', (event, type, msg) => {
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
    const { canceled, filePaths } = await dialog.showOpenDialog({})
    if (!canceled) {
      return filePaths[0]
    }
  }
  async function handleGetSettings(event: IpcMainInvokeEvent, args: [string]) {
    console.log('args: ', args);
    const arr = [...args]
    console.log('type: ', arr[0]);
    console.log('message: ', arr[1]);
    return 'ok'
    // console.log('type: ', args[0]);
    // console.log('msg: ', args[1]);
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
