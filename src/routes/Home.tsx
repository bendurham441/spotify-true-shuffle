import * as React from 'react'
import { getCode } from '../utils'

const Home = () => (
  <div>
    <h1>Test</h1>
    <button onClick={() => getCode()}>Authorize</button>
  </div>
)

export default Home
