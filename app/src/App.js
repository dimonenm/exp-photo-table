import Container from './containers/Container';
import './bootstrap-5.0.1/css/bootstrap.css';
import './App.css';
import Header from './containers/Header';
import Logo from './components/header/Logo';
import Menu from './components/header/Menu';
import MenuItem from './components/header/MenuItem';
import Main from './containers/Main';
import Workplace from './components/main/Workplace';


function App() {
  return (
    <Container>
      <Header>
        <Logo>ЭКЦ РК Фототаблица 0.1</Logo>
        <Menu>
          <MenuItem inputFile={true}>Загрузить фотографии</MenuItem>
          <MenuItem notActive={true}>Печать</MenuItem>
          <MenuItem notActive={true}>Конвертировать в PDF</MenuItem>
          <MenuItem notActive={true}>Конвертировать в Microsoft Word</MenuItem>
          <MenuItem notActive={true}>Настройки</MenuItem>
        </Menu>
      </Header>
      <Main>
        <Workplace>
          
        </Workplace>
      </Main>
    </Container>
  );
}

export default App;
