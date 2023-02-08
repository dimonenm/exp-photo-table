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
import ScaleChanger from './components/main/ScaleChanger';
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

  function addPreviewPages(galleryImages, photoTableData, settings) {
    class PreviewPageItem {
      type
      parity
      pageNumber
      img1
      img2
      img3
      img4

      galleryImages
      photoTableData
      settings

      constructor(galleryImages, photoTableData, settings) {
        this.galleryImages = galleryImages
        this.photoTableData = photoTableData
        this.settings = settings
      }
      getImg3() {
        return this.img3
      }
      setType(value) {
        this.type = value
      }
      setParity(value) {
        this.parity = value
      }
      setPageNumber(value) {
        this.pageNumber = value
      }
      setImg1(value) {
        this.img1 = value
      }
      setImg2(value) {
        this.img2 = value
      }
      setImg3(value) {
        this.img3 = value
      }
      setImg4(value) {
        this.img4 = value
      }
      assemblePage() {
        return (
          <PreviewPage
            key={this.pageNumber}
            type={this.type}
            parity={this.parity}
            pageNumber={this.pageNumber}
            img1={this.img1}
            img2={this.img2}
            img3={this.img3}
            img4={this.img4}
            galleryImages={this.galleryImages}
            setGalleryImages={setGalleryImages}
            photoTableData={this.photoTableData}
            settings={this.settings}
            setModalProperties={setModalProperties}
            currentGalleryImage={currentGalleryImage}
            setCurrentGalleryImage={setCurrentGalleryImage}
            previewPageScale={previewPageScale}
          />
        )
      }
    }
    // если фотографий нет
    if (galleryImages.length === 0) {
      const previewPageItem = new PreviewPageItem(galleryImages, photoTableData, settings)
      previewPageItem.setType('title')
      previewPageItem.setParity('odd')
      previewPageItem.setPageNumber(1)

      arrPreviewPages.push(previewPageItem.assemblePage())
    } else {
      // если фотографии есть

      let pageNumber = 1

      for (let i = 0; i < galleryImages.length; i++) {

        if (i === 0) {
          // если первая фотография
          const previewPageItemTitle = new PreviewPageItem(galleryImages, photoTableData, settings)
          previewPageItemTitle.setType('title')
          previewPageItemTitle.setParity('odd')
          previewPageItemTitle.setPageNumber(pageNumber)
          previewPageItemTitle.setImg1(galleryImages[i])

          arrPreviewPages.push(previewPageItemTitle.assemblePage())
          pageNumber++

          // если первая фотография есть а следующей нет
          if (!galleryImages[i + 1]) {
            const previewPageItemNew = new PreviewPageItem(galleryImages, photoTableData, settings)
            previewPageItemNew.setType('page')
            previewPageItemNew.setParity('even')
            previewPageItemNew.setPageNumber(pageNumber)

            arrPreviewPages.push(previewPageItemNew.assemblePage())
            pageNumber++
          }
        } else {
          // если есть вторая и следующие фотографии
          const previewPageItem = new PreviewPageItem(galleryImages, photoTableData, settings)
          previewPageItem.setType('page')
          previewPageItem.setParity(pageNumber % 2 === 0 ? 'even' : 'odd')
          previewPageItem.setPageNumber(pageNumber)
          previewPageItem.setImg1(galleryImages[i])

          if (galleryImages[i + 1]) {
            // если есть следующая фотография

            if (galleryImages[i]?.getOrientation() === '6X9' && galleryImages[i + 1]?.getOrientation() === '6X9') {
              previewPageItem.setImg2(galleryImages[i + 1])
              // прибовляем 1 к итератору
              i++
            }

            previewPageItem.setImg3(galleryImages[i + 1])
            // прибовляем 1 к итератору
            i++

            if (galleryImages[i]?.getOrientation() === '6X9' && galleryImages[i + 1]?.getOrientation() === '6X9') {
              previewPageItem.setImg4(galleryImages[i + 1])
              // прибовляем 1 к итератору
              i++
            }

            arrPreviewPages.push(previewPageItem.assemblePage())
            pageNumber++
            // если следующей фотографии нет
            if (!galleryImages[i + 1] && previewPageItem.getImg3()) {
              const previewPageItemNew = new PreviewPageItem(galleryImages, photoTableData, settings)
              previewPageItemNew.setType('page')
              previewPageItemNew.setParity(pageNumber % 2 === 0 ? 'even' : 'odd')
              previewPageItemNew.setPageNumber(pageNumber)

              arrPreviewPages.push(previewPageItemNew.assemblePage())
              pageNumber++
            }
          } else {
            // если следующей фотографии нет
            arrPreviewPages.push(previewPageItem.assemblePage())
            pageNumber++
          }
        }
      }
    }
  }

  addPreviewPages(galleryImages, photoTableData, settings)

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
        <Logo>Фототаблица 0.2.3</Logo>
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