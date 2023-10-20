import React, { useState, useEffect } from 'react';
// импорт компонентов
import Container from './containers/Container';
import Header from './containers/Header';
import Main from './containers/Main';
import Logo from './components/header/Logo';
import Menu from './components/header/Menu';
import MenuItem from './components/header/MenuItem';
import Spinner from './Spinner';
// импорт интерфейсов
import { ISettings, IPhotoTableData, ICurrentGalleryImage, IModalProperties, IWorkPlaceStyle, IPreviewPageScale, IGallaryImage } from './interfaces/interfaces';
//импорт сущностей
import { appDataContext } from './entities/AppDataContext';
//импорт функций
import GalleryImage from './entities/GalleryImage';
// импорт стилей
import './stylesheets/App.scss';
import Gallery from './components/main/Gallery';


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
  const [modalProperties, setModalProperties] = useState<IModalProperties>();
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryImg, setGalleryImg] = useState<IGallaryImage>(new GalleryImage());
  const [photoTableData, setphotoTableData] = useState<IPhotoTableData>();
  const [settings, setSettings] = useState<ISettings>();
  const [currentGalleryImage, setCurrentGalleryImage] = useState<ICurrentGalleryImage>();
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

  let arrDownloadedImages: [] = [];

  function addDownloadedImagesToArrforGallery(
    downloadedImages: IDownloadedImages[], //массив загруженных изображений
    arrDownloadedImages: [], //массив для хранения React элементов
    galleryImages: [], //массив изображений выбранных для фототаблицы
    setModalProperties: React.Dispatch<React.SetStateAction<IModalProperties>>, //сеттер со свойствами модального окна
    setCurrentGalleryImage: React.Dispatch<React.SetStateAction<ICurrentGalleryImage>>, //сеттер со свойствами выбранного изображения
  ) {
    //Функция формирует массив с загруженными изображениями.

    arrDownloadedImages = []; //Удаление изображений из массива

    downloadedImages.forEach(item => {

      //Проверка на наличие изображений в галерее и фототаблице
      let isHasInGalleryImages = false;
      if (galleryImages.length) {
        galleryImages.forEach(img => {
          if (item.name === img.getName()) {
            isHasInGalleryImages = true;
          }
        })
      }

      //Формирование массива с загруженными изображениями в зависимости от наличия изображений в галерее и фототаблице
      if (isHasInGalleryImages) {
        arrDownloadedImages.push(<GalleryItem
          key={item.name}
          name={item.name}
          url={item.url}
          hiden={true}
          setModalProperties={setModalProperties}
          setCurrentGalleryImage={setCurrentGalleryImage}
          galleryImages={galleryImages}
        />);
      } else {
        arrDownloadedImages.push(<GalleryItem
          key={item.name}
          name={item.name}
          url={item.url}
          hiden={false}
          setModalProperties={setModalProperties}
          setCurrentGalleryImage={setCurrentGalleryImage}
          galleryImages={galleryImages}
        />);
      }
    });
    return arrDownloadedImages;
  }

  useEffect((): void => {
    getSettings()
  }, [])
  useEffect((): void => {
    console.log('downloadedImages: ', downloadedImages);
    if (downloadedImages) {
      //Функция формирует массив с загруженными изображениями.

   

      arrDownloadedImages = addDownloadedImagesToArrforGallery(downloadedImages, arrDownloadedImages, galleryImages, setModalProperties, setCurrentGalleryImage);






      
    };
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
        <appDataContext.Provider value={
          {
            modalProperties,
            setModalProperties,
            galleryImages,
            setGalleryImages,
            galleryImg,
            setGalleryImg,
            photoTableData,
            setphotoTableData,
            settings,
            setSettings
          }
        }>

        <Header>
          <Logo>Фототаблица 0.3.0</Logo>
          <Menu>
              <MenuItem type='notActiveInputButton'>Загрузить фотографии</MenuItem>
              <MenuItem type='notActiveInputButton'>Данные фототаблицы</MenuItem>
              <MenuItem type='notActiveInputButton'>Печать</MenuItem>
              <MenuItem type='notActiveInputButton'>Сохранить в PDF</MenuItem>
              <MenuItem type='notActiveInputButton'>Сохранить в Microsoft Word</MenuItem>
              <MenuItem type='notActiveInputButton'>Настройки</MenuItem>
              <MenuItem type='notActiveInputButton'>О программе</MenuItem>
          </Menu>
          </Header>
          <Main>
            <Gallery
              galleryImages={galleryImages}
              setGalleryImages={setGalleryImages}
              currentGalleryImage={currentGalleryImage}
              setCurrentGalleryImage={setCurrentGalleryImage}
            >
              {arrDownloadedImages}
            </Gallery>
          </Main>
        {/* {isLoading ? <Spinner /> : null} */}
        </appDataContext.Provider>

      </Container>
    </>
  )
}