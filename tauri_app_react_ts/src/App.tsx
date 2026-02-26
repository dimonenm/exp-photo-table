import { useState } from "react"
import reactLogo from "./assets/react.svg"
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

function App() {

  // async function isDir() {
  //   setDirMsg(await invoke("create_exp_photo_table_dir_command", { url: dirName, fileName: fileName }))
  // }

  return (
    <Container>
      <WindowControlButtons />
      <Header>
        <Logo>Фототаблица 0.3.0</Logo>
        <Menu><></></Menu>
      </Header>
      <Main><></></Main>
    </Container>
  )
}

export default App
