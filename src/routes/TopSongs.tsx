import * as React from 'react'
import { makeRequest, refresh } from '../utils'

const TopSongs = () => {
  const [loading, setLoading] = React.useState(true)
  const [data, setData] = React.useState({})
  React.useEffect(() => {
    const getData = async () => {
      const data = await makeRequest('https://api.spotify.com/v1/me/top/tracks')
      console.log(data)
      setData(data)
      setLoading(false)
    }
    getData()
  }, [])
  if (loading) {
    return <div>Loading</div>
  } else {
    return (
      <div>
        {data.items.map(item => (
          <div>{item.name}</div>
        ))}
      </div>
    )
  }
}

export default TopSongs
