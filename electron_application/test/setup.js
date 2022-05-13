const path = require('path')
const { Application } = require('spectron')

const appPath = () => {
  switch (process.platform) {
    case 'darwin':
      return path.join(__dirname, '..', '.tmp', 'mac', 'ElectronApplication.app', 'Contents', 'MacOS', 'ElectronApplication')
    case 'linux':
      return path.join(__dirname, '..', '.tmp', 'linux', 'ElectronApplication')
    case 'win32':
      return path.join(__dirname, '..', '.tmp', 'win-unpacked', 'ElectronApplication.exe')
    default:
      throw Error(`Unsupported platform ${process.platform}`)
  }
}
global.app = new Application({ path: appPath() })
