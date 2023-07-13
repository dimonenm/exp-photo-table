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

    // let arrImgs: JSX.Element[] = []

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
          console.log('base64: ', base64);
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
    const elements = arrBase64.map((item, index) => {
      const str = item as unknown
      const elem = <img key={index} src={str as string} width={150} height={216} ></img>
      return elem
    })
    console.log('elements: ', elements);
    setImgs(elements)


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
      {isLoading ? <Spinner /> : null}
      {imgs}
    </>
  )
}