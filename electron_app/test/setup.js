const path = require('path')
const { Application } = require('spectron')

const appPath = () => {
  switch (process.platform) {
    case 'darwin':
      return path.join(__dirname, '..', '.tmp', 'mac', 'ElectronApp.app', 'Contents', 'MacOS', 'ElectronApp')
    case 'linux':
      return path.join(__dirname, '..', '.tmp', 'linux', 'ElectronApp')
    case 'win32':
      return path.join(__dirname, '..', '.tmp', 'win-unpacked', 'ElectronApp.exe')
    default:
      throw Error(`Unsupported platform ${process.platform}`)
  }
}
global.app = new Application({ path: appPath() })
