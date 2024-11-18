// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable security/detect-non-literal-fs-filename */
import * as fs from 'fs'
import { promises } from 'fs'
import * as path from 'path'

import { Route } from './src/router/route'

const template = fs.readFileSync('index.html', 'utf-8')

async function main(): Promise<void> {
  for (const route of Object.values(Route)) {
    const fileName = route.replace(/^\//, '')
    if (fileName === '') {
      continue
    }
    const fileIsExists = await existsFile(`${fileName}.html`)
    if (fileIsExists) {
      console.info(`${fileName}.html is exists`)
      continue
    }

    if (fileName.includes('/')) {
      const folderPath = path.dirname(fileName)
      fs.mkdirSync(folderPath, { recursive: true })
    }
    console.info(`success copy index.html to ${fileName}.html`)
    fs.writeFileSync(`${fileName}.html`, template, 'utf-8')
  }
}
void main()

async function existsFile(filePath: string): Promise<boolean> {
  try {
    await promises.access(filePath)
    return true
  } catch {
    return false
  }
}
