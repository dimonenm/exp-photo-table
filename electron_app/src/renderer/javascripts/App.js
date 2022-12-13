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
import OrientationBtn from './components/main/OrientationBtn';
import PreviewTitlePage from './components/main/PreviewTitlePage';
import PreviewDefaultPage from './components/main/PreviewDefaultPage';
import PreviewPage from './components/main/PreviewPage';

//импорт функций
import addDownloadedImagesToArrForGallery from './services/forApp/fAddDownloadedImagesToGallery.js';
import addSelectedImagesToArrForGallery from './services/forApp/fAddSelectedImagesToGallery';
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
  let arrPreviewPages = []

  if (downloadedImages) {
    //Функция формирует массив с загруженными изображениями.
    arrDownloadedImages = addDownloadedImagesToArrForGallery(downloadedImages, arrDownloadedImages, galleryImages, setModalProperties, setCurrentGalleryImage);
  };

  if (galleryImages) {
    //Функция формирует массив с выбранными изображениями для фототаблицы.
    arrGalleryImages = addSelectedImagesToArrForGallery(galleryImages, setGalleryImages, currentGalleryImage, setCurrentGalleryImage, arrGalleryImages, setModalProperties);
  };

  if (galleryImages.length > 0) {
    //Функция формирует массив с выбранными изображениями для фототаблицы.
    function addPreviewPages(galleryImages, photoTableData, settings) {
      class PreviewPageItem {
        type

        galleryImages
        photoTableData
        settings
        setModalProperties

        constructor(galleryImages, photoTableData, settings, ) { 
          this.galleryImages = galleryImages
          this.photoTableData = photoTableData
          this.settings = settings
        }

        setType(value) {
          this.type = value
        }
        assemblePage(index) {
          return (
            <PreviewPage
              key={index}
              index={index}
              type={this.type}
              galleryImages={this.galleryImages}
              photoTableData={this.photoTableData}
              settings={this.settings}
            />
          )
        }
      }

      for (let i = 0; i < galleryImages.length; i++) {

        if (i === 0) {
          const previewPageItem = new PreviewPageItem(galleryImages, photoTableData, settings)
          previewPageItem.setType('title')

          arrPreviewPages.push(previewPageItem.assemblePage(i))
        }

      }
    }

    addPreviewPages(galleryImages, photoTableData, settings)


    arrPreviewPages.push(
      <PreviewTitlePage
        key={galleryImages[0].getIndex()}
        galleryImages={galleryImages}
        index={galleryImages[0].getIndex()}
        orientation={galleryImages[0].getOrientation()}
        isCuted={galleryImages[0].getImgCuted()}
        img={galleryImages[0].getUrl()}
        text={galleryImages[0].getImgDesc()}
        photoTableData={photoTableData}
        settings={settings}
        setModalProperties={setModalProperties}
      />)

    const countOfPages = Math.ceil((galleryImages.length - 1) / 2)
    let counterOfIndexes = 0
    for (let i = 1; i <= countOfPages; i++) {
      arrPreviewPages.push(
        <PreviewDefaultPage
          key={galleryImages[i].getIndex()}
          number={arrPreviewPages.length + 1}
          index={[galleryImages[i + counterOfIndexes].getIndex(), galleryImages[i + 1 + counterOfIndexes] && galleryImages[i + 1 + counterOfIndexes].getIndex()]}
          galleryImages={galleryImages}
          orientation={[galleryImages[i + counterOfIndexes].getOrientation(), galleryImages[i + 1 + counterOfIndexes] && galleryImages[i + 1 + counterOfIndexes].getOrientation()]}
          img={[galleryImages[i + counterOfIndexes].getUrl(), galleryImages[i + 1 + counterOfIndexes] && galleryImages[i + 1 + counterOfIndexes].getUrl()]}
          text={[galleryImages[i + counterOfIndexes].getImgDesc(), galleryImages[i + 1 + counterOfIndexes] && galleryImages[i + 1 + counterOfIndexes].getImgDesc()]}
          photoTableData={photoTableData}
          settings={settings}
          setModalProperties={setModalProperties}
        />)
      counterOfIndexes++
    }
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
        <Logo>ЭКЦ РК Фототаблица 0.1.3</Logo>
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
          Ориентация:
          <OrientationBtn
            type='panorama'
            currentGalleryImage={currentGalleryImage}
            setCurrentGalleryImage={setCurrentGalleryImage}
            galleryImages={galleryImages}
            setGalleryImages={setGalleryImages}
            downloadedImages={downloadedImages}
            setDownloadedImages={setDownloadedImages}></OrientationBtn>
          <OrientationBtn
            type='15x10'
            currentGalleryImage={currentGalleryImage}
            setCurrentGalleryImage={setCurrentGalleryImage}
            galleryImages={galleryImages}
            setGalleryImages={setGalleryImages}
            downloadedImages={downloadedImages}
            setDownloadedImages={setDownloadedImages}></OrientationBtn>
          <OrientationBtn
            type='9x12'
            currentGalleryImage={currentGalleryImage}
            setCurrentGalleryImage={setCurrentGalleryImage}
            galleryImages={galleryImages}
            setGalleryImages={setGalleryImages}
            downloadedImages={downloadedImages}
            setDownloadedImages={setDownloadedImages}></OrientationBtn>
          <OrientationBtn
            type='9x6'
            currentGalleryImage={currentGalleryImage}
            setCurrentGalleryImage={setCurrentGalleryImage}
            galleryImages={galleryImages}
            setGalleryImages={setGalleryImages}
            downloadedImages={downloadedImages}
            setDownloadedImages={setDownloadedImages}></OrientationBtn>
          <OrientationBtn
            type='6x9'
            currentGalleryImage={currentGalleryImage}
            setCurrentGalleryImage={setCurrentGalleryImage}
            galleryImages={galleryImages}
            setGalleryImages={setGalleryImages}
            downloadedImages={downloadedImages}
            setDownloadedImages={setDownloadedImages}></OrientationBtn>
        </OrientationMenu>
        <Workplace>
          {
            arrGalleryImages.length ?
              null :
              <WorkplaceItemNew
                name={`Иллюстрация ${arrGalleryImages.length + 1}`}
                currentGalleryImage={currentGalleryImage}
                setCurrentGalleryImage={setCurrentGalleryImage}
                galleryImages={galleryImages}
                setGalleryImages={setGalleryImages}
                downloadedImages={downloadedImages}
                setDownloadedImages={setDownloadedImages}
              />
          }
          {arrPreviewPages}
        </Workplace>
      </Main>
    </Container>
  );
}

export default App;