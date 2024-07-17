// app.js
const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()
const port = 3100
const FilesPath = path.resolve(__dirname, '../_files')

app.get('/download/list', (req, res) => {
  // fs 读取 FilesPath 目录下的所有文件名，并返回给客户端
  fs.readdir(FilesPath, (err, files) => {
    if (err) {
      return res.status(500).send('Internal Server Error')
    }

    res.json(files)
  })
})

app.get('/download/:filename', (req, res) => {
  const filePath = path.join(FilesPath, req.params.filename)

  // res.download(filePath)

  fs.stat(filePath, (err, stats) => {
    if (err) {
      return res.status(404).send('File not found')
    }

    const range = req.headers.range
    console.log('range', range)

    if (!range) {
      const start = 0
      const chunkSize = 500
      const end = start + chunkSize + 1
      const fileStream = fs.createReadStream(filePath)

      res.writeHead(200, {
        // 'Content-Range': `bytes ${start}-${end}/${stats.size}`,
        // 'Accept-Ranges': 'bytes',
        'Content-Length': stats.size,
        'Content-Type': 'application/octet-stream',
      })

      fileStream.pipe(res)

      return
    }

    const ranges = rangeParser(stats.size, range)
    if (ranges === -1) {
      return res.status(416).send('Range not satisfiable')
    }

    const { start, end } = ranges[0]
    const chunkSize = end - start + 1
    const fileStream = fs.createReadStream(filePath, { start, end })

    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${stats.size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'application/octet-stream',
    })

    fileStream.pipe(res)
  })
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
