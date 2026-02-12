import { useState } from "react"
import reactLogo from "./assets/react.svg"
import { invoke } from "@tauri-apps/api/core"
import "./fonts.css"
import "./App.css"

//импортирование компонентов
import Container from './assets/containers/Container'



function App() {

  // async function isDir() {
  //   setDirMsg(await invoke("create_exp_photo_table_dir_command", { url: dirName, fileName: fileName }))
  // }

  return (
    <Container>
      <></>
    </Container>
  )
}

export default App
