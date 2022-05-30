// https://electronjs.org/docs/tutorial/security
// Preload File that should be loaded into browser window instead of
// setting nodeIntegration: true for browser window

import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('DataBaseAPI', {
  onLoaded: callback => {
    ipcRenderer.on('settings', callback)
  },
  saveSettings: settings => {
    ipcRenderer.send('setSettings', settings)
  }
})