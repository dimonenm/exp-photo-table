// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  sendAction: (type: string, action: string) => ipcRenderer.send('renderer_to_main', type, action),
  sendRequest: (type: string, req: string): Promise<string> => ipcRenderer.invoke('renderer_to_main', [type, req]),
  getSettings: (): Promise<string> => ipcRenderer.invoke('getSettings'),
  setSettings: (settings: string): Promise<string> => ipcRenderer.invoke('setSettings', settings),
  openFile: () => ipcRenderer.invoke('dialog:openFile')
})