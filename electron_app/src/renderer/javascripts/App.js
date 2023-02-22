import React, { useState, createContext } from 'react';

import Container from './containers/Container';
import Header from './containers/Header';
import Logo from './components/header/Logo';
import Menu from './components/header/Menu';
import MenuItem from './components/header/MenuItem';
import Main from './containers/Main';
import Workplace from './components/main/Workplace';
import Gallery from './components/main/Gallery';
import Modal from './containers/Modal';

import ScaleChanger from './components/main/ScaleChanger';
//импорт функций
import addDownloadedImagesToArrForGallery from './services/forApp/fAddDownloadedImagesToGallery.js';
import addSelectedImagesToArrForGallery from './services/forApp/fAddSelectedImagesToGallery';
import addPreviewPages from './services/forApp/AddPreviewPages'
import GalleryImage from './entities/GalleryImage';
export const modalDataContext = createContext();

function App() {
  const [downloadedImages, setDownloadedImages] = useState();
  const [photoTableData, setphotoTableData] = useState({
    numbOMP: null,
    factOMP: null,
    adressOMP: null,
    dateOMP: null,
    dateForDoc: null,
    unit: null,
    kusp: null,
    executor: null
  });
  const [settings, setSettings] = useState({
    address: '',
    executors: [],
    note: '',
    official_status: '',
    tel: '',
    unit: '',
    zip_code: ''
  });
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryImg, setGalleryImg] = useState(new GalleryImage());
  const [currentGalleryImage, setCurrentGalleryImage] = useState({
    index: null,
    nameImg: null,
    urlImg: null,
    orientation: null
  });
  const [modalProperties, setModalProperties] = useState({
    isOpen: false,
    type: null,
    nameImg: null,
    urlImg: null,
    textImg: null,
    indexImgInGallery: null,
    cut: false
  });
  const [workPlaceStyle, setWorkPlaceStyle] = useState({
    zoom: '1'
  })
  const [previewPageScale, setPreviewPageScale] = useState({
    transform: 'scale(1) translate(0px)',
    margin: '10px 0 0 0'
  })

  globalThis.DataBaseAPI.onLoaded((_, data) => {
    setSettings(data);
    setphotoTableData(prev => { return { ...prev, executor: data.executors[0], unit: data.unit } });
  })

  let arrDownloadedImages = [];
  let arrGalleryImages = [];
  let arrPreviewPages = []

  if (downloadedImages) {
    //Функция формирует массив с загруженными изображениями.
    arrDownloadedImages = addDownloadedImagesToArrForGallery(downloadedImages, arrDownloadedImages, galleryImages, setModalProperties, setCurrentGalleryImage);
  };

  if (galleryImages) {
    //Функция формирует массив с выбранными изображениями для фототаблицы.
    arrGalleryImages = addSelectedImagesToArrForGallery(galleryImages, setGalleryImages, currentGalleryImage, setCurrentGalleryImage, arrGalleryImages, setModalProperties);
  };

  addPreviewPages(arrPreviewPages, galleryImages, setGalleryImages, photoTableData, settings, setModalProperties, currentGalleryImage, setCurrentGalleryImage, previewPageScale)

  return (
    <Container>
      <modalDataContext.Provider
        value={{
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
        }}>
        <Modal />
      </modalDataContext.Provider>
      <Header>
        <Logo>Фототаблица 0.2.4</Logo>
        <Menu>
          <MenuItem
            type={'forInputFile'}
            setDownloadedImages={setDownloadedImages}
          >
            Загрузить фотографии
          </MenuItem>
          <MenuItem
            type={'forsetPhotoTableData'}
            photoTableData={photoTableData}
            setModalProperties={setModalProperties}
          >Данные фототаблицы</MenuItem>
          <MenuItem notActive={true}>Печать</MenuItem>
          <MenuItem notActive={true}>Сохранить в PDF</MenuItem>
          <MenuItem
            type={'forConvertToMicrosoftWord'}
            photoTableData={photoTableData}
            galleryImages={galleryImages}
            settings={settings}
          >Сохранить в Microsoft Word</MenuItem>
          <MenuItem
            type={'forSettings'}
            modalProperties={modalProperties}
            setModalProperties={setModalProperties}
            >Настройки</MenuItem>
          <MenuItem
            type={'forAbout'}
            modalProperties={modalProperties}
            setModalProperties={setModalProperties}
          >О программе</MenuItem>
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
        <ScaleChanger
          workPlaceStyle={workPlaceStyle}
          setWorkPlaceStyle={setWorkPlaceStyle}
          setPreviewPageScale={setPreviewPageScale}
        />
        <Workplace
          workPlaceStyle={workPlaceStyle}
        >
          {arrPreviewPages}
        </Workplace>
      </Main>
    </Container>
  );
}

export default App;