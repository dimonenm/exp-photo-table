/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/latest/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */
import React from 'react';
import { createRoot } from 'react-dom/client';

import '../index.css';

console.log('👋 This message is being logged by "renderer.js", included via webpack');

declare global {
  interface Window {
    electronBridge?: IElectronBridge;
  }
}
interface IElectronBridge{
  sendTitle: (title:string) => void
}

let isMaximize: boolean


const winMax = (): void => {
  console.log('isMaximize', isMaximize);
  if (isMaximize) {
    window.electronBridge.sendTitle('unmaximize')
    isMaximize = false
  } else {
    window.electronBridge.sendTitle('maximize')
    isMaximize = true
  }
  
}
const winMin = (): void => {
  window.electronBridge.sendTitle('minimize')
}
const winClose = (): void => {
  window.close()
}

window.onload = () => {
  const container = document.querySelector('.root');
  const root = createRoot(container);
  root.render(<div> 
    <button onClick={winMin}>min</button>
    <button onClick={winMax}>max</button>
    <button onClick={winClose}>close</button>
  </div>);
  // root.render(React.createElement('div', { className: 'greeting' }, 'Hello world'));
}
