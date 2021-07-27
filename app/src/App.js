import React, { useState } from 'react';
import Container from './containers/Container';
import Header from './containers/Header';
import Logo from './components/header/Logo';
import Menu from './components/header/Menu';
import MenuItem from './components/header/MenuItem';
import Main from './containers/Main';
import Workplace from './components/main/Workplace';
import WorkplaceItem from './components/main/WorkplaceItem';
import WorkplaceItemNew from './components/main/WorkplaceItemNew';
import Gallery from './components/main/Gallery';
import GalleryItem from './components/main/GalleryItem';
import './bootstrap-5.0.1/css/bootstrap.css';
import './App.css';


function App() {
  const [downloadedImages, setDownloadedImages] = useState();
  
  if (downloadedImages) {
    downloadedImages.forEach(element => {
      console.log(element);
    });
  }

  return (
    <Container>
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
          <GalleryItem name="Без имени-1" />
          <GalleryItem name="IMG_20210624_155543" />
        </Gallery>
        <Workplace>
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
