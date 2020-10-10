import * as React from 'react'

import Song from './Song'

interface Image {
  url: string
}

interface Album {
  name: string
  images: Image[]
}

interface Artist {
  name: string
}

interface Song {
  name: string
  artists: Artist[]
  album: Album
  duration_ms: number
}

interface SongListProps {
  songs: Song[]
}

const SongList = ({ songs }: SongListProps) => (
  <div>
    <h2>Songs to Queue</h2>
    {songs.map(song => {
      let artistString = song.artists.reduce(
        (string, artist) => (string += `${artist.name}, `),
        ''
      )
      artistString = artistString.substring(0, artistString.length - 2)
      return (
        <Song
          name={song.name}
          artist={artistString}
          imgUrl={song.album.images[0].url}
        />
      )
    })}
  </div>
)

export default SongList
