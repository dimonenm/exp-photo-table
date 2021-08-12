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
import GalleryItem from './components/main/GalleryItem';
import Modal from './containers/Modal';
import './App.css';

export const modalDataContext = createContext();

function App() {
  const [downloadedImages, setDownloadedImages] = useState();
  const [photoTableData, setphotoTableData] = useState();
  // const [galleryImages, setGalleryImages] = useState();
  const [modalProperties, setModalProperties] = useState({
    isOpen: false,
    type: null,
    nameImg: null,
    urlImg: null
  });

  let arrDownloadedImages = [];
  // let arrGalleryImages = [];

  if (downloadedImages) {
    let key = 0;
    downloadedImages.forEach(item => {
      arrDownloadedImages.push(<GalleryItem
        key={key}
        name={item.name}
        url={item.url}
        setModalProperties={setModalProperties}
      />);
      key++;
    });
  };

  return (
    <Container>
      <modalDataContext.Provider value={{ modalProperties, setModalProperties}}>
        <Modal />
      </modalDataContext.Provider>
      <Header>
        <Logo>ЭКЦ РК Фототаблица 0.1</Logo>
        <Menu>
          <MenuItem
            inputFile={true}
            setDownloadedImages={setDownloadedImages}
          >
            Загрузить фотографии
          </MenuItem>
          <MenuItem notActive={true}>Печать</MenuItem>
          <MenuItem notActive={true}>Конвертировать в PDF</MenuItem>
          <MenuItem notActive={true}>Конвертировать в Microsoft Word</MenuItem>
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
          <WorkplaceItem
            name="Иллюстрация 1"
            img=""
            text="расположение а/м «Мазда» г.р.з. XXXXXX-XX, по адресу: Республика Крым, г.
              Евпатория, ул. 2-ой Гвардейской армии, д. X."
          />
          <WorkplaceItemNew
            name="Иллюстрация 2"
          />
        </Workplace>
      </Main>
    </Container>
  );
}

export default App;
