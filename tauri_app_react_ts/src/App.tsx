import { useState, useEffect } from "react"
import { invoke } from "@tauri-apps/api/core"

import "./fonts.css"
import "./App.css"

//импортирование интерфейсов
import IDownloadedImage from './assets/interfaces/IDownloadedImage'
import IPhotoTableData from './assets/interfaces/IPhotoTableData'
import IModalProperties from './assets/interfaces/IModalProperties'

//импортирование компонентов
import Container from './assets/containers/Container'
import Header from './assets/containers/Header'
import Main from './assets/containers/Main'
import Logo from './assets/components/header/Logo'
import Menu from './assets/containers/Menu'
import WindowControlButtons from './assets/components/header/WindowControlButtons'
import MenuItem from './assets/components/header/MenuItem'
import Gallery from './assets/components/main/Gallery'
import Workplace from './assets/components/main/Workplace'
import ScaleChanger from './assets/components/main/ScaleChanger'
import Modal from './assets/components/Modal'

function App() {

  const [downloadedImages, setDownloadedImages] = useState<IDownloadedImage[]>([])
  const [photoTableData, setPhotoTableData] = useState<IPhotoTableData>({
    numbOMP: null,
    factOMP: null,
    adressOMP: null,
    dateOMP: null,
    dateForDoc: null,
    unit: null,
    kusp: null,
    executor: null
  })
  const [modalProperties, setModalProperties] = useState<IModalProperties>({
    isOpen: false,
    type: null
  })

  useEffect(() => {
    invoke<string>("init_app_settings").then((result) => console.log(result)).catch((err) => console.error(err))
  }, [])

  // async function isDir() {
  //   setDirMsg(await invoke("create_exp_photo_table_dir_command", { url: dirName, fileName: fileName }))
  // }

  return (
    <Container>
      <WindowControlButtons />
      <Header>
        <Logo>Фототаблица 0.3.0</Logo>
        <Menu>
          <MenuItem
            type={'forInputFile'}
            setDownloadedImages={setDownloadedImages}
          >
            Загрузить фотографии
          </MenuItem>
          <MenuItem
            type={'forSetPhotoTableData'}
            photoTableData={photoTableData}
            setModalProperties={setModalProperties}
          >Данные фототаблицы</MenuItem>
        </Menu>
      </Header>
      <Main>
        <Gallery downloadedImages={downloadedImages} />
        <ScaleChanger />
        <Workplace>
          {/* Здесь будут превью страниц фототаблицы */}
        </Workplace>
      </Main>
      <Modal
        modalProperties={modalProperties}
        setModalProperties={setModalProperties}
        photoTableData={photoTableData}
        setPhotoTableData={setPhotoTableData}
      />
    </Container>
  )
}

export default App
