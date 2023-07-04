import React from 'react';
import { createRoot } from 'react-dom/client';

import '../index.css';

console.log('👋 This message is being logged by "renderer.js", included via webpack');

declare global {
  interface Window {
    electronAPI?: IElectronAPI;
  }
}
interface IElectronAPI {
  sendAction: (type: string, action: string) => void,
  sendRequest: (type: string, req: string) => Promise<string>,
  openFile: () => void,
}

let isMaximize: boolean

const winMax = (): void => {
  if (isMaximize) {
    window.electronAPI.sendAction('btnAction', 'unmaximize')
    isMaximize = false
  } else {
    window.electronAPI.sendAction('btnAction', 'maximize')
    isMaximize = true
  }

}
const winMin = (): void => {
  window.electronAPI.sendAction('btnAction', 'minimize')
}
const winClose = (): void => {
  window.close()
}
const sendMessage = async (): Promise<void> => {
  const res = await window.electronAPI.sendRequest('getSettings', 'all')
  console.log('res: ', res);
  // const filePath = await window.electronAPI.openFile()
  // console.log('filePath: ', filePath);
}

window.onload = () => {
  const container = document.querySelector('.root');
  const root = createRoot(container);
  root.render(<div>
    <button onClick={winMin}>min</button>
    <button onClick={winMax}>max</button>
    <button onClick={winClose}>close</button>
    <button onClick={sendMessage}>sendMessage</button>
  </div>);
  // root.render(React.createElement('div', { className: 'greeting' }, 'Hello world'));
}
