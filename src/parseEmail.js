const fs = require('fs')

const readFileAsync = path =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err)
        return
      }

      resolve(data)
    })
  })

module.exports = async path => {
  try {
    const data = await readFileAsync(path)
    return JSON.parse(data.toString())
  } catch (err) {
    console.log(`Error! ${path} is supposed to be JSON...\n`, err)
  }
}
