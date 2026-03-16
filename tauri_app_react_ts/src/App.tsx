import { useState, useEffect } from "react"
import { invoke } from "@tauri-apps/api/core"

import "./fonts.css"
import "./App.css"

//импортирование компонентов
import Container from './assets/containers/Container'
import Header from './assets/containers/Header'
import Main from './assets/containers/Main'
import Logo from './assets/components/header/Logo'
import Menu from './assets/containers/Menu'
import WindowControlButtons from './assets/components/header/WindowControlButtons'
import MenuItem from './assets/components/header/MenuItem'

function App() {

  const [downloadedImages, setDownloadedImages] = useState<string[]>([])
  const [downloadedImagesUrls, setDownloadedImagesUrls] = useState<string[]>([])
  console.log('downloadedImages: ', downloadedImages)
  console.log('downloadedImagesUrls: ', downloadedImagesUrls);


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
            setDownloadedImagesUrls={setDownloadedImagesUrls}
          >
            Загрузить фотографии
          </MenuItem>
        </Menu>
      </Header>
      <Main><></></Main>
    </Container>
  )
}

export default App
