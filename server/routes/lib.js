import fs from 'node:fs/promises'
import * as Path from 'node:path'

export async function getFile(filePath) {
  try {
    return await fs
      .readFile(Path.resolve(filePath), 'utf-8')
      .then((data) => JSON.parse(data))
  } catch (err) {
    console.error(err.message)
  }
}

export async function updateFile(file) {
  try {
    const updatedFile = JSON.stringify(file, null, 2)
    fs.writeFile(Path.resolve('server/data/neworder.json'), updatedFile)
  } catch (err) {
    console.error(err.message)
  }
}
