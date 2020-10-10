import * as React from 'react'
import styled from 'styled-components'

const Card = styled.div`
  display: flex;
  img {
    width: 5rem;
    height: 5rem;
    border-radius: 0.5rem 0 0 0.5rem;
  }
  div {
    margin-left: 2rem;
  }
  p {
    margin: 0.5em 0;
  }
  background-color: hsl(0, 0%, 93%);
  border-radius: 0 0.5rem 0.5rem 0;
  box-shadow: 0 0.2rem 0.4rem lightgray;
  margin-bottom: 1rem;
`

const ArtistText = styled.p`
  color: hsl(0, 0%, 50%)
`;

const SongText = styled.p`
  font-weight: 600;
`;

interface SongProps {
  imgUrl: string
  name: string
  artist: string
}

const Song = ({ name, imgUrl, artist }: SongProps) : React.FC => {
  return (
    <Card>
      <img src={imgUrl} />
      <div>
        <SongText>{name}</SongText>
        <ArtistText>{artist}</ArtistText>
      </div>
    </Card>
  )
}

export default Song
