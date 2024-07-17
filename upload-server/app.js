// app.js
const express = require('express')
const multer = require('multer')
const path = require('path')

const app = express()
const port = 3200
const FilesPath = path.resolve(__dirname, '../_files')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, FilesPath)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
// Initialize multer with storage configuration
const upload = multer({ storage: storage })

// Route for Homepage
app.get('/', (req, res) => {
  res.send('Welcome to the homepage!')
})

app.post('/upload', upload.single('file'), (req, res) => {
  res.send('文件上传成功')
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
