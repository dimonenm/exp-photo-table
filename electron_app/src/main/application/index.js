import path from 'path'
import { app, BrowserWindow, ipcMain } from 'electron';

export default class TimerApp {
  constructor() {
    this.subscribeForAppEvents()
    app.whenReady().then(() => this.createWindow())
  }

  createWindow() {
    this.window = new BrowserWindow({
      title: CONFIG.name,
      width: CONFIG.width,
      height: CONFIG.height,
      minWidth: CONFIG.width,
      minHeight: CONFIG.height,
      autoHideMenuBar: true,
      // maxWidth: CONFIG.width,
      // maxHeight: CONFIG.height,
      titleBarStyle: 'hidden',
      titleBarOverlay: {
        height: 20,
        color: "#343a40",
        symbolColor: "#fff"
      },
      webPreferences: {
        worldSafeExecuteJavaScript: true,
        preload: path.join(app.getAppPath(), 'preload', 'index.js')
      }
    })

    this.window.loadFile('renderer/index.html')

    this.window.on('closed', () => {
      this.window = null
    })

    this.window.webContents.openDevTools({ mode: 'detach' });
  }

  subscribeForAppEvents() {
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.createWindow()
      }
    })
  }

  
}