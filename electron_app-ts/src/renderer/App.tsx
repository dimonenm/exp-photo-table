import { useState, useEffect } from 'react';
// импорт компонентов
import Container from './containers/Container';
import Header from './containers/Header';
import Logo from './components/header/Logo';
import Menu from './components/header/Menu';
import Spinner from './Spinner';
// импорт интерфейсов
import { ISettings, IPhotoTableData, ICurrentGalleryImage, IModalProperties, IWorkPlaceStyle, IPreviewPageScale } from './interfaces/interfaces';
//импорт функций
import GalleryImage from './entities/GalleryImage';
// импорт стилей
import './stylesheets/App.scss';

declare global {
  interface Window {
    electronAPI?: IElectronAPI,
  }
}
interface IElectronAPI {
  // sendAction: (type: string, action: string) => void,
  // sendRequest: (type: string, req: string) => Promise<string>,
  getSettings: () => Promise<ISettings>,
  // setSettings: (settings: ISettings) => Promise<string>,
  openFile: () => Promise<IDownloadedImages[]>,
}
interface IDownloadedImages {
  name: string,
  data: Uint8Array
}


export const App = (): JSX.Element => {

  const [downloadedImages, setDownloadedImages] = useState<IDownloadedImages[]>();
  const [photoTableData, setphotoTableData] = useState<IPhotoTableData>();
  const [settings, setSettings] = useState<ISettings>();
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryImg, setGalleryImg] = useState(new GalleryImage());
  const [currentGalleryImage, setCurrentGalleryImage] = useState<ICurrentGalleryImage>();
  const [modalProperties, setModalProperties] = useState<IModalProperties>();
  const [workPlaceStyle, setWorkPlaceStyle] = useState<IWorkPlaceStyle>({
    zoom: '1'
  })
  const [previewPageScale, setPreviewPageScale] = useState<IPreviewPageScale>({
    transform: 'scale(1) translate(0px)',
    margin: '10px 0 0 0'
  })

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // let isMaximize: boolean

  // const winMax = (): void => {
  //   if (isMaximize) {
  //     window.electronAPI.sendAction('btnAction', 'unmaximize')
  //     isMaximize = false
  //   } else {
  //     window.electronAPI.sendAction('btnAction', 'maximize')
  //     isMaximize = true
  //   }
  // }
  // const winMin = (): void => {
  //   window.electronAPI.sendAction('btnAction', 'minimize')
  // }
  // const winClose = (): void => {
  //   window.close()
  // }
  // const sendMessage = async (): Promise<void> => {
  //   const res = await window.electronAPI.sendRequest('getSettings', 'all')
  //   console.log('res: ', res);
  //   // const filePath = await window.electronAPI.openFile()
  //   // console.log('filePath: ', filePath);
  // }
  const getSettings = async () => {
    const res = await window.electronAPI.getSettings()
    setSettings(res);
  }

  // const setSettings = async () => {
  //   // const settings = settingsState
  //   // const newSettings: ISettings = { ...settings, executors: ['Д.Н. Арзяков'] }
  //   // const res = await window.electronAPI.setSettings(newSettings)
  // }
  const openFile = async (): Promise<void> => {
    // async function readFileAsDataURL(file: Blob) {
    //   const result_base64 = await new Promise((resolve) => {
    //     const fileReader = new FileReader();
    //     fileReader.onload = () => {
    //       const dataUrlPrefix = `data:image/png;base64,`;
    //       const base64WithDataUrlPrefix = fileReader.result as string;
    //       const base64 = dataUrlPrefix + base64WithDataUrlPrefix.split(',')[1]
    //       resolve(base64)
    //       // resolve(fileReader.result)
    //     };
    //     fileReader.readAsDataURL(file);
    //   });

    //   return result_base64;
    // }

    setIsLoading(true)

    // const base64: string[] = []
    // const arrImgs: JSX.Element[] = []
    const receivedImages: IDownloadedImages[] = await window.electronAPI.openFile()

    setDownloadedImages(receivedImages)

    setIsLoading(false)
    // const buffer: Uint8Array[] = await window.electronAPI.openFile()

    // const blobs: Blob[] = buffer.map((item) => {
    //   return new Blob([item])
    // })

    // for (let i = 0; i < blobs.length; i++) {
    //   const dataURL = await readFileAsDataURL(blobs[i])
    //   base64.push(dataURL as string)
    // }

    // for (const item of base64) {
    //   const img = <img key={item.length} src={item} width={150} height={216}></img>
    //   arrImgs.push(img)
    // }

    // setImgs(arrImgs)



  }



  useEffect((): void => {
    getSettings()
  }, [])
  useEffect((): void => {
    console.log('downloadedImages: ', downloadedImages);
  }, [downloadedImages])



  return (
    <>
      {/* <div>
        <button onClick={winMin}>min</button>
        <button onClick={winMax}>max</button>
        <button onClick={winClose}>close</button>
        <button onClick={sendMessage}>sendMessage</button>
        <button onClick={getSettings}>getSettings</button>
        <button onClick={setSettings}>setSettings</button>
        <button onClick={openFile}>openFile</button>
      </div> */}
      <Container>
        <Header>
          <Logo>Фототаблица 0.3.0</Logo>
          <Menu>
            
          </Menu>
        </Header>
        {/* {isLoading ? <Spinner /> : null} */}

      </Container>
    </>
  )
}