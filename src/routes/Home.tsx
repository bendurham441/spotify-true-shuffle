import * as React from 'react'
import { Link } from 'react-router-dom'
import { getCode } from '../utils'

const Home = (): React.FC => (
  <div>
    <h1>Test</h1>
    <button onClick={() => getCode()}>Authorize</button>
    <Link to="/landing">
      <button>Landing</button>
    </Link>
  </div>
)

export default Home
