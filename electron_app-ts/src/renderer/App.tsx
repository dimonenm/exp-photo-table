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
import { ISettings, IPhotoTableData, ICurrentGalleryImage, IModalProperties, IWorkPlaceStyle, IPreviewPageScale, IGallaryImage, IDownloadedImages, IProcessedImages } from './interfaces/interfaces';
//импорт сущностей
import { appDataContext } from './entities/AppDataContext';
//импорт функций
import GalleryImage from './entities/GalleryImage';
// импорт стилей
import './stylesheets/App.scss';
import Gallery from './components/main/Gallery';
import GalleryItem from './components/main/GalleryItem';


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

export const App = (): JSX.Element => {

  const [downloadedImages, setDownloadedImages] = useState<IDownloadedImages[]>();
  const [processedImages, setProcessedImages] = useState<IProcessedImages[]>();
  const [processedImagesMin, setProcessedImagesMin] = useState<IProcessedImages[]>();
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

  let arrDownloadedImages: JSX.Element[] = [];

  if (processedImages && processedImages.length > 0) {
    arrDownloadedImages = addProcessedImagesToArrforGallery(processedImages, galleryImages, setModalProperties, setCurrentGalleryImage)
  }

  function addProcessedImagesToArrforGallery(
    processedImages: IProcessedImages[], //массив загруженных изображений
    // arrDownloadedImages: JSX.Element[], //массив для хранения React элементов
    galleryImages: any[], //массив изображений выбранных для фототаблицы
    setModalProperties: React.Dispatch<React.SetStateAction<IModalProperties>>, //сеттер со свойствами модального окна
    setCurrentGalleryImage: React.Dispatch<React.SetStateAction<ICurrentGalleryImage>>, //сеттер со свойствами выбранного изображения
  ) {
    const arrDownloadedImages: JSX.Element[] = []; //массив для хранения React элементов

    //Удаление изображений из массива
    while (arrDownloadedImages.length) {
      arrDownloadedImages.pop();
    }

    //Функция формирует массив с загруженными изображениями.
    processedImages.forEach(item => {

      //Проверка на наличие изображений в галерее и фототаблице
      let isHasInGalleryImages = false;
      if (galleryImages.length) {
        galleryImages.forEach((img: IGallaryImage) => {
          if (item.name === img.getName()) {
            isHasInGalleryImages = true;
          }
        })
      }

      //Формирование массива с загруженными изображениями в зависимости от наличия изображений в галерее и фототаблице
      const JSXElement = <GalleryItem
        key={item.name}
        name={item.name}
        url={item.url}
        // data={item.data}
        hidden={isHasInGalleryImages ? true : false}
        setModalProperties={setModalProperties}
        setCurrentGalleryImage={setCurrentGalleryImage}
        galleryImages={galleryImages}
      />
      arrDownloadedImages.push(JSXElement);
    });
    return arrDownloadedImages;
  }
  function convertBufferToURL(buffer: Uint8Array): string {
    const blob = new Blob([buffer], { type: 'image/jpeg' })
    const url = URL.createObjectURL(blob)
    return url
  }

  useEffect((): void => {
    getSettings()
  }, [])
  useEffect((): void => {
    if (downloadedImages) {

        //-------------------------------------------
      const processImages = downloadedImages.map((item) => {
        const processedImage: IProcessedImages = {
          name: item.name,
          url: convertBufferToURL(item.buffer)
        }

        return processedImage
      })

      setProcessedImages(processImages)
      //------------------------------------------------

    }
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
            setSettings,
            setDownloadedImages,
            setIsLoading
          }
        }>

          <Header>
            <Logo>Фототаблица 0.3.0</Logo>
            <Menu>
              <MenuItem type='downloadImages'>Загрузить фотографии</MenuItem>
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