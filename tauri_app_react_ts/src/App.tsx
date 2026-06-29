import { invoke } from '@tauri-apps/api/core'
import { useEffect, useState } from 'react'
import { readTextFile, BaseDirectory } from '@tauri-apps/plugin-fs'

import './App.css'
import './fonts.css'

//импортирование интерфейсов
import IDownloadedImage from './assets/interfaces/IDownloadedImage'
import IModalProperties from './assets/interfaces/IModalProperties'
import IPhotoTableData from './assets/interfaces/IPhotoTableData'
import IPhotoTableSettings from './assets/interfaces/IPhotoTableSettings'

//импортирование компонентов
import Logo from './assets/components/header/Logo'
import MenuItem from './assets/components/header/MenuItem'
import WindowControlButtons from './assets/components/header/WindowControlButtons'
import Gallery from './assets/components/main/Gallery'
import ScaleChanger from './assets/components/main/ScaleChanger'
import Workplace from './assets/components/main/Workplace'
import Modal from './assets/components/modal/Modal'
import Container from './assets/containers/Container'
import Header from './assets/containers/Header'
import Main from './assets/containers/Main'
import Menu from './assets/containers/Menu'

function App() {
  const [downloadedImages, setDownloadedImages] = useState<IDownloadedImage[]>(
    [],
  )
  const [isLoading, setIsLoading] = useState(false)
  const [photoTableData, setPhotoTableData] = useState<IPhotoTableData>({
    numbOMP: null,
    factOMP: null,
    adressOMP: null,
    dateOMP: null,
    dateForDoc: null,
    unit: null,
    kusp: null,
    executor: null,
  })
  const [photoTableSettings, setPhotoTableSettings] =
    useState<IPhotoTableSettings>()
  const [modalProperties, setModalProperties] = useState<IModalProperties>({
    isOpen: false,
    type: null,
  })

  useEffect(() => {
    invoke<string>('init_app_settings')
      .then(result => console.log(result))
      .catch(err => console.error(err))
  }, [])

  // Загрузка настроек приложения
  useEffect(() => {
    const loadSettings = async () => {
      try {
        // Читаем файл settings.json из директории AppConfig (стандартное место для настроек)
        // Если файл должен быть в корне приложения, используйте BaseDirectory.App
        const content = await readTextFile('settings.json', {
          baseDir: BaseDirectory.AppConfig,
        })
        
        const settings = JSON.parse(content) as IPhotoTableSettings
        setPhotoTableSettings(settings)
        console.log('Настройки загружены:', settings)
      } catch (error) {
        console.error('Ошибка при загрузке настроек:', error)
      }
    }

    loadSettings()
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
            setIsLoading={setIsLoading}
          >
            Загрузить фотографии
          </MenuItem>
          <MenuItem
            type={'forSetPhotoTableData'}
            setModalProperties={setModalProperties}
          >
            Данные фототаблицы
          </MenuItem>
          <MenuItem
            type={'forSetPhotoTableSettings'}
            setModalProperties={setModalProperties}
          >
            Настройки
          </MenuItem>
        </Menu>
      </Header>
      <Main>
        <Gallery downloadedImages={downloadedImages} isLoading={isLoading} />
        <ScaleChanger />
        <Workplace>{/* Здесь будут превью страниц фототаблицы */}</Workplace>
      </Main>
      <Modal
        modalProperties={modalProperties}
        setModalProperties={setModalProperties}
        photoTableData={photoTableData}
        setPhotoTableData={setPhotoTableData}
        photoTableSettings={photoTableSettings}
        setPhotoTableSettings={setPhotoTableSettings}
      />
    </Container>
  )
}

export default App
