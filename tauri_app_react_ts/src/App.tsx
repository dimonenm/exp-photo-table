import { useState } from "react"
import reactLogo from "./assets/react.svg"
import { invoke } from "@tauri-apps/api/core"

import { getCurrentWindow } from '@tauri-apps/api/window'

// Получаем экземпляр текущего окна
const appWindow = getCurrentWindow()

import "./fonts.css"
import "./App.css"

//импортирование компонентов
import Container from './assets/containers/Container'
import Header from './assets/containers/Header'
import Main from './assets/containers/Main'
import Logo from './assets/components/header/Logo'
import Menu from './assets/containers/Menu'



function App() {

  // async function isDir() {
  //   setDirMsg(await invoke("create_exp_photo_table_dir_command", { url: dirName, fileName: fileName }))
  // }

  const handleMinimize = () => {
    appWindow.minimize()
  }

  const handleMaximize = () => {
    appWindow.toggleMaximize() // Переключает режим развернуто/свернуто
  }

  const handleClose = () => {
    appWindow.close()
  }

  // Базовый стиль для кнопок
  const buttonStyle: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: '16px',
    width: '46px',
    height: '30px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s',
  }

  return (
    <Container>
      <div style={{ display: 'flex', position:'absolute', right:'0px' }}>
        {/* Кастомный заголовок */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '30px',
            //WebkitAppRegion: 'drag', // Для electron-совместимости, если нужно, но Tauri использует data-атрибут
          }}
        >
          {/* Кнопки управления */}
          <div style={{ display: 'flex' }}>
            <button
              onClick={handleMinimize}
              style={buttonStyle}
              onMouseEnter={(e) => e.currentTarget.style.background = '#ffffff20'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              &#9472; {/* Минус */}
            </button>

            <button
              onClick={handleMaximize}
              style={buttonStyle}
              onMouseEnter={(e) => e.currentTarget.style.background = '#ffffff20'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              &#9723; {/* Квадрат */}
            </button>

            <button
              onClick={handleClose}
              style={buttonStyle}
              onMouseEnter={(e) => e.currentTarget.style.background = '#e81123'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              &#10005; {/* Крестик */}
            </button>
          </div>
        </div>
      </div>
      <Header>
        <Logo>Фототаблица 0.3.0</Logo>
        <Menu><></></Menu>
      </Header>
      <Main><></></Main>
    </Container>
  )
}

export default App
