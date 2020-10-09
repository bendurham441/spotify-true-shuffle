import * as React from 'react'
import { makeRequest } from '../utils'

const LikedSongs = () => {
  const [data, setData] = React.useState({})
  const [loading, setLoading] = React.useState(true)
  const [songs, setSongs] = React.useState([])

  const getSongs = async () => {
    const firstRequest = await makeRequest('/me/tracks', {
      limit: 50,
      offset: 0,
    })
    setSongs(songs => [
      ...songs,
      ...firstRequest.items.map(item => item.track.name),
    ])
    const total = firstRequest.total
    if (total > 50) {
      let requests = []
      let current = 50
      while (current <= total) {
        requests.push(makeRequest('/me/tracks', { limit: 50, offset: current }))
        current += 50
      }
      if (total % 50 != 0) {
        requests.push(
          makeRequest('/me/tracks', { limit: total % 50, offset: current })
        )
      }
      let allData = await Promise.all(requests)
      let songArray = []
      for (let array of allData) {
        setSongs(songs => [...songs, ...array.items.map(item => item.track.name)])
      }
      return allData
    }
  }

  React.useEffect(() => {
    const fetchData = async () => {
      await getSongs()
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return <div>Loading</div>
  } else {
    console.log(songs)
    return (
      <div>
        {songs.map(song => (
          <div>{song}</div>
        ))}
      </div>
    )
  }
}

export default LikedSongs
