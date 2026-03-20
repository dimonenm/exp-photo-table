import { useState, useEffect } from "react"
import { invoke } from "@tauri-apps/api/core"
import { readFile, BaseDirectory } from '@tauri-apps/plugin-fs'

import "./fonts.css"
import "./App.css"

//импортирование интерфейсов
import IDownloadedImage from './assets/interfaces/IDownloadedImage'

//импортирование компонентов
import Container from './assets/containers/Container'
import Header from './assets/containers/Header'
import Main from './assets/containers/Main'
import Logo from './assets/components/header/Logo'
import Menu from './assets/containers/Menu'
import WindowControlButtons from './assets/components/header/WindowControlButtons'
import MenuItem from './assets/components/header/MenuItem'
import ImageItem from './assets/components/main/ImageItem'

function App() {

  const [downloadedImages, setDownloadedImages] = useState<IDownloadedImage[]>([])
  const [downloadedImagesUrls, setDownloadedImagesUrls] = useState<string[]>([])
  const [downloadedImagesThumbnails, setDownloadedImagesThumbnails] = useState<string[]>([])
  console.log('downloadedImagesUrls: ', downloadedImagesUrls)
  console.log('downloadedImagesThumbnails: ', downloadedImagesThumbnails)

  const img = new Image()
  img.alt = "Фото"

  const imgThumbnail = new Image()
  imgThumbnail.src = downloadedImagesThumbnails[0]


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
            setDownloadedImagesUrls={setDownloadedImagesUrls}
            setDownloadedImagesThumbnails={setDownloadedImagesThumbnails}
            setDownloadedImages={setDownloadedImages}
          >
            Загрузить фотографии
          </MenuItem>
        </Menu>
      </Header>
      <Main>
        {downloadedImagesUrls.map((fileName, index) => (
          <ImageItem key={`img-${index}-${fileName}`} fileName={fileName} />
        ))}
        {<img src={imgThumbnail.src} alt="Фото" />}
      </Main>
    </Container>
  )
}

export default App
