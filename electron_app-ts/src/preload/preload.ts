// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  sendAction: (type: string, action: string) => ipcRenderer.send('renderer_to_main', type, action),
  sendRequest: (type: string, req: string) => ipcRenderer.send('renderer_to_main', type, req),
  openFile: () => ipcRenderer.invoke('dialog:openFile')
})