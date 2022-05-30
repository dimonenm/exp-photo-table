import path from 'path'
import { mkdirSync, existsSync, readFileSync, writeFileSync } from 'fs'
import { app } from 'electron'

export class Settings{
  constructor() {
    this.directory = path.join(app.getPath('userData'), 'settings');

    if (!existsSync(this.directory)) {
      mkdirSync(this.directory)
    }
  }
  get(key) {
    return this.read(key)
  }

  set(key, data) {
    return this.write(key, data)
  }

  read(key) {
    return JSON.parse(readFileSync(this.file(key)))
    // return JSON.parse(readFileSync(this.file(key)).toString('utf-8'))
  }

  write(key, data) {
    return writeFileSync(this.file(key), JSON.stringify(data))
  }

  file(key) {
    const file = path.join(this.directory, `${key}.json`)
    if (!existsSync(file)) {
      writeFileSync(file, '{"note": "", "executors": [], "unit": ""}', { flag: 'wx' })
    }
    return file
  }
}