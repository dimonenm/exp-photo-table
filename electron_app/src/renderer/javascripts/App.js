import React, { useState, useEffect, createContext } from 'react';

import Container from './containers/Container';
import Header from './containers/Header';
import Logo from './components/header/Logo';
import Menu from './components/header/Menu';
import MenuItem from './components/header/MenuItem';
import Main from './containers/Main';
import Workplace from './components/main/Workplace';
import WorkplaceItemDataBtn from './components/main/WorkplaceItemDataBtn';
import WorkplaceItemNew from './components/main/WorkplaceItemNew';
import Gallery from './components/main/Gallery';
import Modal from './containers/Modal';

//импорт функций
import addDownloadedImagesToArrForGallery from './services/forApp/fAddDownloadedImagesToGallery.js';
import addSelectedImagesToArrForGallery from './services/forApp/fAddSelectedImagesToGallery';
import loadSettings from './services/forApp/fLoadSettings';
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
    note: '',
    executors: [],
    unit: ''
  });
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryImg, setGalleryImg] = useState(new GalleryImage());
  const [currentGalleryImage, setCurrentGalleryImage] = useState({
    nameImg: null,
    urlImg: null,
    textImg: null,
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

  // useEffect(() => {
  //   loadSettings().then(data => {
  //     if (data) {
  //       setSettings(data);
  //       setphotoTableData(prev => { return { ...prev, executor: data.executors[0], unit: data.unit } });        
  //     } else {
  //       console.log(`Произошла ошибка в App.js:61`);
  //     }
  //   });
  // }, []);


  let arrDownloadedImages = [];
  let arrGalleryImages = [];

  if (downloadedImages) {
    //Функция формирует массив с загруженными изображениями.
    arrDownloadedImages = addDownloadedImagesToArrForGallery(downloadedImages, arrDownloadedImages, galleryImages, setModalProperties, setCurrentGalleryImage);
  };

  if (galleryImages) {
    //Функция формирует массив с выбранными изображениями для фототаблицы.
    arrGalleryImages = addSelectedImagesToArrForGallery(galleryImages, arrGalleryImages, setModalProperties);
  };

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
        <Logo>ЭКЦ РК Фототаблица 0.0.2</Logo>
        <Menu>
          <MenuItem
            type={'forInputFile'}
            setDownloadedImages={setDownloadedImages}
          >
            Загрузить фотографии
          </MenuItem>
          <MenuItem notActive={true}>Печать</MenuItem>
          <MenuItem notActive={true}>Конвертировать в PDF</MenuItem>
          <MenuItem
            type={'forConvertToMicrosoftWord'}
            photoTableData={photoTableData}
            galleryImages={galleryImages}
          >Конвертировать в Microsoft Word</MenuItem>
          <MenuItem
            type={'forSettings'}
            modalProperties={modalProperties}
            setModalProperties={setModalProperties}
          >Настройки</MenuItem>
        </Menu>
      </Header>
      <Main>
        <Gallery>
          {arrDownloadedImages}
        </Gallery>
        <Workplace>
          <WorkplaceItemDataBtn
            photoTableData={photoTableData}
            setModalProperties={setModalProperties}
          />
          <WorkplaceItemNew
            name={`Иллюстрация ${arrGalleryImages.length + 1}`}
            currentGalleryImage={currentGalleryImage}
            setCurrentGalleryImage={setCurrentGalleryImage}
            galleryImages={galleryImages}
            setGalleryImages={setGalleryImages}
            downloadedImages={downloadedImages}
            setDownloadedImages={setDownloadedImages}
          />
          {arrGalleryImages}
        </Workplace>
      </Main>
    </Container>
  );
}

export default App;