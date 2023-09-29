import path from 'path'
import { mkdirSync, existsSync, readFileSync, writeFileSync } from 'fs'
import { app } from 'electron'

interface ISettings{
  directory: string;
  get(key: string): string;
  set(key: string, data: string): void;
  read(key: string): string;
  write(key: string, data: string): void;
  file(key: string): string;
}

export class Settings implements ISettings {
  
  directory = path.join(app.getPath('userData'), 'settings');
  
  constructor() {
    if (!existsSync(this.directory)) {
      mkdirSync(this.directory)
    }
  }

  get(key: string): string {
    return this.read(key)
  }

  set(key: string, data: string): void {
    return this.write(key, data)
  }

  read(key: string): string {
    const buffer: string = readFileSync(this.file(key)).toString()
    return JSON.parse(buffer)
  }

  write(key: string, data: string): void {
    return writeFileSync(this.file(key), JSON.stringify(data))
  }

  file(key: string): string {
    const file = path.join(this.directory, `${key}.json`)
    if (!existsSync(file)) {
      writeFileSync(file, '{"address": "Адрес не указан", "executors": [], "note": "Примечание: не указано", "official_status": "специалист", "tel": "Телефон не указан", "unit": "Подразделение не указано", "zip_code": "Почтовый индекс не указан"}', { flag: 'wx' })
    }
    return file
  }
}