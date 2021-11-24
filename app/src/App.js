import React, { useState, createContext } from 'react';
import Container from './containers/Container';
import Header from './containers/Header';
import Logo from './components/header/Logo';
import Menu from './components/header/Menu';
import MenuItem from './components/header/MenuItem';
import Main from './containers/Main';
import Workplace from './components/main/Workplace';
import WorkplaceItem from './components/main/WorkplaceItem';
import WorkplaceItemDataBtn from './components/main/WorkplaceItemDataBtn';
import WorkplaceItemNew from './components/main/WorkplaceItemNew';
import Gallery from './components/main/Gallery';
import Modal from './containers/Modal';
import './App.css';

import addDownloadedImagesToArrforGallery from './services/forApp/fAddDownloadedImagesToGallery.js';

export const modalDataContext = createContext();

function App() {

  const [downloadedImages, setDownloadedImages] = useState();
  const [photoTableData, setphotoTableData] = useState({
    numbOMP: null,
    factOMP: null,
    adressOMP: null,
    dateOMP: null,
    dateForDoc: null,
    unit: "№15 Симферопольский",
    kusp: null,
    executor: "Д.С. Ежель"
  });
  const [galleryImages, setGalleryImages] = useState([]);
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

  let arrDownloadedImages = [];
  let arrGalleryImages = [];


  if (downloadedImages) {
    //Функция формирует массив с загруженными изображениями.
    arrDownloadedImages = addDownloadedImagesToArrforGallery(downloadedImages, arrDownloadedImages, galleryImages, setModalProperties, setCurrentGalleryImage);
  };

  if (galleryImages) {
    let key = 0;
    galleryImages.forEach((item, index) => {
      arrGalleryImages.unshift(<WorkplaceItem
        key={key}
        index={index}
        name={`Иллюстрация ${arrGalleryImages.length + 1}`}
        img={item.urlImg}
        text={item.textImg}
        setModalProperties={setModalProperties}
      />);
      key++;
    });
  };

  return (
    <Container>
      <modalDataContext.Provider
        value={{ modalProperties, setModalProperties, galleryImages, setGalleryImages, photoTableData, setphotoTableData }}>
        <Modal />
      </modalDataContext.Provider>
      <Header>
        <Logo>ЭКЦ РК Фототаблица 0.1</Logo>
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
          >
            Конвертировать в Microsoft Word</MenuItem>
          <MenuItem notActive={true}>Настройки</MenuItem>
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