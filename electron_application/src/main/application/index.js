import path from 'path'
import { app, BrowserWindow, ipcMain } from 'electron';

export default class TimerApp{
  constructor() {
    app.whenReady().then(() => this.createWindow())
  }

  createWindow() {
    this.window = new BrowserWindow({
      title: CONFIG.name,
      width: CONFIG.width,
      height: CONFIG.height,
      minWidth: CONFIG.width,
      minHeight: CONFIG.height,
      // maxWidth: CONFIG.width,
      // maxHeight: CONFIG.height,
      // titleBarStyle: 'hidden',
      // titleBarOverlay: {
      //   height: 30,
      //   color: "#303952",
      //   symbolColor: "#fff"
      // },
      webPreferences: {
        worldSafeExecuteJavaScript: true,
        preload: path.join(app.getAppPath(), 'preload', 'index.js')
      }
    })
    console.log('CONFIG.width', CONFIG.width);
    console.log('CONFIG.height', CONFIG.height);
  
    this.window.loadFile('renderer/index.html')
  
    // this.timer.onChange = () => {
    //   this.window.webContents.send('tick', JSON.stringify({ time: this.timer.get(), title: this.entry.title }))
    // }
  
    // this.window.webContents.on('did-finish-load', () => {
    //   this.window.webContents.send('entries', JSON.stringify({ entries: this.storage.get('entries') }));
    // })
  
    this.window.on('closed', () => {
      // this.timer.onChange = null
      this.window = null
    })
  
    this.window.webContents.openDevTools({ mode: 'detach' });
  }
}
