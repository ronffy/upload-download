import { useEffect, useState } from 'react'
import { apis } from '../../constants/apis'
import { fetchDownloadList } from '../../servers/download'
import './index.css'

export default function Download() {
  const [list, setList] = useState<string[]>([])

  const handleDownload = (fileName: string) => {
    if (fileName) {
      window.open(`${apis.download}/${fileName}`)
    }
  }

  const queryList = async () => {
    const data = await fetchDownloadList()
    setList(data)
  }

  useEffect(() => {
    queryList()
  }, [])

  return (
    <>
      <button onClick={queryList}>刷新</button>
      <ul className="list">
        {list.map((item) => (
          <li>
            <span>{item}</span>&nbsp;&nbsp;
            <button onClick={() => handleDownload(item)}>下载</button>
          </li>
        ))}
      </ul>
    </>
  )
}
