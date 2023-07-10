import React, { useState } from 'react';

declare global {
  interface Window {
    electronAPI?: IElectronAPI;
  }
}
interface IElectronAPI {
  sendAction: (type: string, action: string) => void,
  sendRequest: (type: string, req: string) => Promise<string>,
  // openFile: () => Promise<Uint8Array>
  openFile: () => Promise<Uint8Array[]>
}

export const App = (): JSX.Element => {
  const [imgs, setImgs] = useState<JSX.Element[]>([])
  console.log('imgs: ', imgs);

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

    console.log('filePath: ', filePath);

    const arrImgs: HTMLImageElement[] = []
    for (const item of filePath) {
      const blob = new Blob([item])
      const url = URL.createObjectURL(blob)
      const img = new Image(150, 216)
      img.src = url
      arrImgs.push(img)
    }

    const elem = document.querySelector('.imgs')

    for (const item of arrImgs) {
      elem.appendChild(item)
    }
    

    // const base64_arraybuffer = async (data: Uint8Array) => {
    //   // Use a FileReader to generate a base64 data URI
    //   const base64url = await new Promise<string>((res) => {
    //     const reader = new FileReader()
    //     reader.onload = () => {
    //       res(reader.result as string)
    //     }
    //     reader.readAsDataURL(new Blob([data]))
    //   })

    //   /*
    //   The result looks like 
    //   "data:application/octet-stream;base64,<your base64 data>", 
    //   so we split off the beginning:
    //   */
    //   return base64url.substring(base64url.indexOf(',') + 1)
    // }
    // const imgData = btoa(String.fromCharCode.apply(null, filePath))
    // const imgData = 'data:image/jpeg;base64,' + await base64_arraybuffer(filePath)
    // console.log('imgData: ', imgData);
    // const imgsArr: JSX.Element[] = []
    
    // for (const item of filePath) {
    //   const imgData = 'data:image/png;base64,' + item
    //   imgsArr.push(<img key={filePath.length} src={imgData} width={200} height={100}></img>)
    // }

    // setImgs(() => { return imgsArr })
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
      <div className='imgs'></div>
      {imgs ? imgs : null}
    </>
  )
}