import { useState } from 'react';

declare global {
  interface Window {
    electronAPI?: IElectronAPI;
  }
}
interface IElectronAPI {
  sendAction: (type: string, action: string) => void,
  sendRequest: (type: string, req: string) => Promise<string>,
  openFile: () => Promise<string[]>
}

export const App = (): JSX.Element => {
  const [imgs, setImgs] = useState<JSX.Element[]>([])

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
  const openFile = async (): Promise<void> => {
    const filePath = await window.electronAPI.openFile()


    console.log('filePath[0]: ', filePath[0][0].length + filePath[0][1].length);
    console.log('filePath[1]: ', filePath[1][0].length + filePath[1][1].length);

    // setImgs(filePath.map((item, index) => {
    //   return <img key={index} style={{ width: "150px", height: '213px' }} src={`data:image/png;base64,` + item}></img>
    // }))
  }


  return (
    <>
      <div>
        <button onClick={winMin}>min</button>
        <button onClick={winMax}>max</button>
        <button onClick={winClose}>close</button>
        <button onClick={sendMessage}>sendMessage</button>
        <button onClick={openFile}>openFile</button>
      </div>
      {imgs ? imgs : null}
    </>
  )
}