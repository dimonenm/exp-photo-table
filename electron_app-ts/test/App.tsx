import React, { useState } from 'react';
import Spinner from './Spinner'

declare global {
  interface Window {
    electronAPI?: IElectronAPI,
  }
}
interface IElectronAPI {
  sendAction: (type: string, action: string) => void,
  sendRequest: (type: string, req: string) => Promise<string>,
  getSettings: () => Promise<ISettings>,
  setSettings: (settings: ISettings) => Promise<string>,
  openFile: () => Promise<Uint8Array[]>,
}
interface ISettings {
  address: string,
  executors: string[],
  note: string,
  official_status: string,
  tel: string,
  unit: string,
  zip_code: string,
}

export const App = (): JSX.Element => {
  const [imgs, setImgs] = useState<JSX.Element[]>()
  const [isLoading, setIsLoading] = useState(false);
  const [settingsState, setSettingsState] = useState<ISettings>();

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
  const getSettings = async () => {
    const res = await window.electronAPI.getSettings()
    console.log('getSettings: ', res);
    setSettingsState(res);
  }
  const setSettings = async () => {
    // const settings = settingsState
    // const newSettings: ISettings = { ...settings, executors: ['Д.Н. Арзяков'] }
    // const res = await window.electronAPI.setSettings(newSettings)
  }
  const openFile = async (): Promise<void> => {
    async function readFileAsDataURL(file: Blob) {
      const result_base64 = await new Promise((resolve) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          const dataUrlPrefix = `data:image/png;base64,`;
          const base64WithDataUrlPrefix = fileReader.result as string;
          const base64 = dataUrlPrefix + base64WithDataUrlPrefix.split(',')[1]
          resolve(base64)
          // resolve(fileReader.result)
        };
        fileReader.readAsDataURL(file);
      });

      return result_base64;
    }

    setIsLoading(true)

    const startTimeTest: number = Date.now()

    const base64: string[] = []
    const arrImgs: JSX.Element[] = []
    const buffer: Uint8Array[] = await window.electronAPI.openFile()

    const blobs: Blob[] = buffer.map((item) => {
      return new Blob([item])
    })

    for (let i = 0; i < blobs.length; i++) {
      const dataURL = await readFileAsDataURL(blobs[i])
      base64.push(dataURL as string)
    }

    for (const item of base64) {
      const img = <img key={item.length} src={item} width={150} height={216}></img>
      arrImgs.push(img)
    }

    const stopTimeTest: number = Date.now()
    console.log('prepare time: ', (stopTimeTest - startTimeTest) / 1000, ' sec')
    setImgs(arrImgs)

    setIsLoading(false)

  }

  return (
    <>
      <div>
        <button onClick={winMin}>min</button>
        <button onClick={winMax}>max</button>
        <button onClick={winClose}>close</button>
        <button onClick={sendMessage}>sendMessage</button>
        <button onClick={getSettings}>getSettings</button>
        <button onClick={setSettings}>setSettings</button>
        <button onClick={openFile}>openFile</button>
      </div>
      {isLoading ? <Spinner /> : null}
      {imgs}
    </>
  )
}