import * as React from 'react'
import styled from 'styled-components'
import Song from '../components/Song'
import SongList from '../components/SongList'
import {
  ContainerContent,
  ContainerHeader,
  ContentContainer,
  MainHeading,
  SubTitle,
} from '../StyleElements'
import { makeRequest } from '../utils'

const TimeIntervalButton = styled.button`
  padding: 1em;
  font-weight: 700;
  color: white;
  transition: 0.5s;
  border: 0.2em solid hsl(180, 50%, 50%);
  background-color: hsl(180, 50%, 50%);
  width: 48%;
  margin-bottom: 1em;
  border-radius: 1em;
  &:hover {
    color: hsl(180, 50%, 50%);
    background-color: white;
  }
  box-shadow: 0 0.2rem 0.4rem lightblue;
`

const TimeIntervals = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const QueueButton = styled.div`
  padding: 1rem;
  font-weight: 600;
  color: white;
  background-color: blue;
  &:hover {
    background-color: red;
  }
`

interface song {
  name: string
  duration_ms: number
}

const getTimeLengthSongs = (songs: song[]): number => {
  let num = songs.reduce<number>(
    (total, item) => (total += item.duration_ms / 60000),
    0
  )
  console.log(num)
  return num
}

const getRandomInt = (bound: number): number => {
  return Math.floor(Math.random() * bound)
}

const LikedSongs = () => {
  const [queueGenerated, setQueueGenerated] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [songs, setSongs] = React.useState([])
  const [queuedSongs, setQueuedSongs] = React.useState([])

  const getSongs = async () => {
    const firstRequest = await makeRequest(
      '/me/tracks',
      new URLSearchParams({
        limit: '50',
        offset: '0',
      })
    )
    setSongs(songs => [...songs, ...firstRequest.items.map(item => item.track)])
    const total = firstRequest.total
    if (total > 50) {
      let requests = []
      let current = 50
      while (current <= total) {
        //requests.push(makeRequest('/m/tracks', new URLSearchParams()))
        requests.push(
          makeRequest(
            '/me/tracks',
            new URLSearchParams({ limit: '50', offset: current.toString() })
          )
        )
        current += 50
      }
      if (total % 50 != 0) {
        requests.push(
          makeRequest(
            '/me/tracks',
            new URLSearchParams({
              limit: (total % 50).toString(),
              offset: current.toString(),
            })
          )
        )
      }
      let allData = await Promise.all(requests)
      for (let array of allData) {
        setSongs(songs => [...songs, ...array.items.map(item => item.track)])
      }
      return allData
    }
  }

  const generateShuffle = (time: number) => {
    let songsToQueue: song[] = []
    while (getTimeLengthSongs(songsToQueue) <= time) {
      let songIndex = getRandomInt(songs.length)
      songsToQueue = [...songsToQueue, songs[songIndex]]
    }
    setQueuedSongs(songsToQueue)
    setQueueGenerated(true)
    console.log(songsToQueue)
  }

  const addSongstoQueue = (songs: song[]) => {}

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
    return (
      <ContentContainer>
        <ContainerHeader>
          <MainHeading>How Long?</MainHeading>
        </ContainerHeader>
        <ContainerContent>
          <SubTitle>Select a Duration</SubTitle>
          <TimeIntervals>
            <TimeIntervalButton onClick={() => generateShuffle(10)}>
              10m
            </TimeIntervalButton>
            <TimeIntervalButton onClick={() => generateShuffle(30)}>
              30m
            </TimeIntervalButton>
            <TimeIntervalButton onClick={() => generateShuffle(60)}>
              60m
            </TimeIntervalButton>
            <TimeIntervalButton onClick={() => generateShuffle(100)}>
              100m
            </TimeIntervalButton>
          </TimeIntervals>
          <div>
            {queueGenerated && (
              <div>
                <SongList songs={queuedSongs} />
                <QueueButton>Add to Queue</QueueButton>
              </div>
            )}
          </div>
        </ContainerContent>
      </ContentContainer>
    )
  }
}

export default LikedSongs
