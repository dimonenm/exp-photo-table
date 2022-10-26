import React, { useState, createContext } from 'react';

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
import OrientationMenu from './components/main/OrientationMenu';
import OrientationMenuDataBtn from './components/main/OrientationMenuDataBtn';
import OrientationPanoramaBtn from './components/main/OrientationPanoramaBtn';
import Orientation12x9Btn from './components/main/Orientation12x9Btn';
import Orientation9x12Btn from './components/main/Orientation9x12Btn';
import Orientation9x6Btn from './components/main/Orientation9x6Btn';
import Orientation6x9Btn from './components/main/Orientation6x9Btn';
import Orientation15x10Btn from './components/main/Orientation15x10Btn';
import Orientation10x15Btn from './components/main/Orientation10x15Btn';
//импорт функций
import addDownloadedImagesToArrForGallery from './services/forApp/fAddDownloadedImagesToGallery.js';
import addSelectedImagesToArrForGallery from './services/forApp/fAddSelectedImagesToGallery';
import GalleryImage from './entities/GalleryImage';
import OrientationBtn from './components/main/OrientationBtn';

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

  globalThis.DataBaseAPI.onLoaded((_, data) => {
    setSettings(data);
    setphotoTableData(prev => { return { ...prev, executor: data.executors[0], unit: data.unit } });
  })

  let arrDownloadedImages = [];
  let arrGalleryImages = [];

  if (downloadedImages) {
    //Функция формирует массив с загруженными изображениями.
    arrDownloadedImages = addDownloadedImagesToArrForGallery(downloadedImages, arrDownloadedImages, galleryImages, setModalProperties, setCurrentGalleryImage);
  };

  if (galleryImages) {
    //Функция формирует массив с выбранными изображениями для фототаблицы.
    arrGalleryImages = addSelectedImagesToArrForGallery(galleryImages, setGalleryImages, currentGalleryImage, setCurrentGalleryImage, arrGalleryImages, setModalProperties);
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
        <Logo>ЭКЦ РК Фототаблица 0.1.2</Logo>
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
            settings={settings}
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
        <OrientationMenu>
          <OrientationMenuDataBtn
            photoTableData={photoTableData}
            setModalProperties={setModalProperties}
          />
          Ориентация:
          <OrientationBtn type='panorama'></OrientationBtn>
          <OrientationBtn type='15x10'></OrientationBtn>
          <OrientationPanoramaBtn>Панорама</OrientationPanoramaBtn>
          <Orientation15x10Btn>15x10</Orientation15x10Btn>
          <Orientation10x15Btn>10x15</Orientation10x15Btn>
          <Orientation12x9Btn>12x9</Orientation12x9Btn>
          <Orientation9x12Btn>9x12</Orientation9x12Btn>
          <Orientation9x6Btn>9x6</Orientation9x6Btn>
          <Orientation6x9Btn>6x9</Orientation6x9Btn>
        </OrientationMenu>
        <Workplace>
          {
            arrGalleryImages.length ?
              null :
              <WorkplaceItemNew
                name={`Лист ${arrGalleryImages.length + 1}`}
                currentGalleryImage={currentGalleryImage}
                setCurrentGalleryImage={setCurrentGalleryImage}
                galleryImages={galleryImages}
                setGalleryImages={setGalleryImages}
                downloadedImages={downloadedImages}
                setDownloadedImages={setDownloadedImages}
              />
          }
          {arrGalleryImages}
        </Workplace>
      </Main>
    </Container>
  );
}

export default App;