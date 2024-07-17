import { ChangeEvent, useState } from 'react'
import { fetchUploadFile } from './servers/upload'
import './App.css'

function App() {
  const [loading, setLoading] = useState(false)

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) {
      return
    }

    setLoading(true)
    await fetchUploadFile(e.target.files[0])
    setLoading(false)
  }

  return (
    <>
      {loading ? <div>loading</div> : null}

      <input type="file" onChange={handleUpload} />
    </>
  )
}

export default App
