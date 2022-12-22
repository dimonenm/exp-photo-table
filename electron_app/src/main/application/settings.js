import path from 'path'
import { mkdirSync, existsSync, readFileSync, writeFileSync } from 'fs'
import { app } from 'electron'

export class Settings {
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
  }

  write(key, data) {
    return writeFileSync(this.file(key), JSON.stringify(data))
  }

  file(key) {
    const file = path.join(this.directory, `${key}.json`)
    if (!existsSync(file)) {
      writeFileSync(file, '{"address": "Адрес не указан", "executors": [], "note": "Примечание: не указано", "official_status": "специалист", "tel": "Телефон не указан", "unit": "Подразделение не указано", "zip_code": "Почтовый индекс не указан"}', { flag: 'wx' })
    }
    return file
  }
}
