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
}