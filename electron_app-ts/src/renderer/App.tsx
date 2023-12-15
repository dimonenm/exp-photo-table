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
import { ISettings, IPhotoTableData, ICurrentGalleryImage, IModalProperties, IWorkPlaceStyle, IPreviewPageScale, IGallaryImage, IDownloadedImages, IProcessedImagesMin, IAutoSaveSettings } from './interfaces/interfaces';
//импорт сущностей
import { appDataContext } from './entities/AppDataContext';
//импорт функций
import GalleryImage from './entities/GalleryImage';
// импорт стилей
import './stylesheets/App.scss';
import Gallery from './components/main/Gallery';
import GalleryItem from './components/main/GalleryItem';
import { IpcMainInvokeEvent, ipcRenderer } from 'electron';


declare global {
  interface Window {
    electronAPI?: IElectronAPI,
  }
}
interface IElectronAPI {
  // sendAction: (type: string, action: string) => void,
  // sendRequest: (type: string, req: string) => Promise<string>,
  // setSettings: (settings: ISettings) => Promise<string>,
  getSettings: () => Promise<ISettings>,
  openFile: () => Promise<IDownloadedImages[]>,
  isAutoSaveExist: () => Promise<IAutoSaveSettings | null>,
  downloadImage: (url: string) => Promise<Uint8Array>,
}

export const App = (): JSX.Element => {

  const [downloadedImages, setDownloadedImages] = useState<IDownloadedImages[]>([]);
  const [processedImagesMin, setProcessedImagesMin] = useState<IProcessedImagesMin[]>([]);
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
  const isAutoSaveExist = async (): Promise<IAutoSaveSettings | null> => {
    const res = await window.electronAPI.isAutoSaveExist()
    return res
  }
  const applyAutoSaveSettings = async (settings: IAutoSaveSettings): Promise<IDownloadedImages[]> => {
    const arr: IDownloadedImages[] = []

    await settings.imagesUrls.forEach(async (item, index) => {
      const res: Uint8Array = await window.electronAPI.downloadImage(item)
      arr.push({ name: settings.imagesNames[index], buffer: res })
    })

    return arr
  }

  let arrDownloadedImages: JSX.Element[] = [];

  if (processedImagesMin && processedImagesMin.length > 0) {
    arrDownloadedImages = addProcessedImagesToArrforGallery(processedImagesMin, galleryImages, setModalProperties, setCurrentGalleryImage)
  }

  function addProcessedImagesToArrforGallery(
    processedImages: IProcessedImagesMin[], //массив загруженных изображений
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
  function resizeImage(source: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const newWidth = 200
        const naturalWidth = img.naturalWidth
        const newHeight = img.naturalHeight * newWidth / naturalWidth
        canvas.width = newWidth;
        canvas.height = newHeight;
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
        resolve(canvas.toDataURL());
      };
      img.onerror = reject;
      img.src = source;
    });
  }
  const resizeDownloadedImages = async () => {
    const processImagesMinArr: IProcessedImagesMin[] = []

    for (let i = 0; i < downloadedImages.length; i++) {
      const urlFromBuffer = convertBufferToURL(downloadedImages[i].buffer)
      const processedImage: { name: string, url: string } = {
        name: downloadedImages[i].name,
        url: await resizeImage(urlFromBuffer)
      }
      processImagesMinArr.push(processedImage)
      URL.revokeObjectURL(urlFromBuffer)
    }
    setIsLoading(false)
    setProcessedImagesMin(processImagesMinArr)
    setDownloadedImages([])
  }

  useEffect((): void => {
    getSettings()
    isAutoSaveExist().then((settings) => {
      if (settings) {
        applyAutoSaveSettings(settings).then((data) => {
          setDownloadedImages(data)
        })
      }
    })
  }, [])
  useEffect((): void => {
    if (downloadedImages.length > 0) {
      resizeDownloadedImages()
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
            {isLoading ?
              <Spinner></Spinner> :
              <Gallery
                galleryImages={galleryImages}
                setGalleryImages={setGalleryImages}
                currentGalleryImage={currentGalleryImage}
                setCurrentGalleryImage={setCurrentGalleryImage}
              >
                {arrDownloadedImages}
              </Gallery>
            }
          </Main>
          {/* {isLoading ? <Spinner /> : null} */}
        </appDataContext.Provider>

      </Container>
    </>
  )
}