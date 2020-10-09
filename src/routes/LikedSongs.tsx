import * as React from 'react'
import { makeRequest } from '../utils'

const LikedSongs = () => {
  const [data, setData] = React.useState({})
  const [loading, setLoading] = React.useState(true)
  const [songs, setSongs] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      let total;
      let current = 0;
      do {
        const data = await makeRequest('/me/tracks', {limit: 50, offset: current})
        total = data.total;
        console.log("making request")
        let newSongs = data.items.map(item => item.track.name)
        setSongs(songs => [...songs, ...newSongs])
        current += 50
      } while (current + 50 <= total)
      if (total % 50 != 0) {
        const data = await makeRequest('/me/tracks', {limit: total % 50, offset: current})
        let newSongs = data.items.map(item => item.track.name)
        setSongs(songs => [...songs, ...newSongs])
      }

      setLoading(false)
      console.log(songs)
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