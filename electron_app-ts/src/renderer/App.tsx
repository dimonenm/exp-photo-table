import React, { useState, useEffect } from 'react';
import Spinner from './Spinner'

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
  const [imgs, setImgs] = useState<JSX.Element[]>()
  const [isLoading, setIsLoading] = useState(false);

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

    setIsLoading(true)

    const filePath = await window.electronAPI.openFile()



    // for (const item of filePath) {
    //   const blob = new Blob([item])
    //   const url = URL.createObjectURL(blob)
    //   const img = <img key={item.length} src={url} width={150} height={216}></img>
    //   arrImgs.push(img)
    // }

    const mimeType = 'image/png';



    const convertBlobToBase64Async = (blob: Blob, mimeType: string) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const dataUrlPrefix = `data:${mimeType};base64,`;
          const base64WithDataUrlPrefix = reader.result as string;
          const base64 = dataUrlPrefix + base64WithDataUrlPrefix.split(',')[1]
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    };

    const arrBase64 = await filePath.map(async (item) => {
      const blob = new Blob([item])
      return await convertBlobToBase64Async(blob, mimeType).then((base64: string) => {

        return base64
      });
    })



    // const elements = await arrBase64.map((item, index) => {
    //   const str = item as unknown
    //   const elem = <img key={index} src={str as string} width={150} height={216} ></img>
    //   return elem
    // })

    const arrImgs: JSX.Element[] = []
    console.log('arrImgs1: ', arrImgs);
    
    console.log('1');
    const elements = await filePath.map(async (item, index) => {
      const blob = new Blob([item])
      const str: unknown = await blob.text
      arrImgs.push(<img key={index} src={str as string} width={150} height={216} ></img>)
      // const elem = <img key={index} src={str as string} width={150} height={216} ></img>
      console.log('2');
      // return elem
    })
    console.log('arrImgs2: ', arrImgs);
    console.log('3');

    setImgs(arrImgs)


    // const urlLinks = filePath.map((item) => {
    //   const blob = new Blob([item])
    //   // const url = URL.createObjectURL(blob)

    //   // return url
    // })

    // urlLinks.map((item, index) => {
    //   const img = <img key={index} src={item} width={150} height={216}></img>
    //   arrImgs.push(img)
    // })

    // setImgs(arrImgs)
    setIsLoading(false)

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
      {isLoading ? <Spinner /> : null}
      {imgs}
    </>
  )
}