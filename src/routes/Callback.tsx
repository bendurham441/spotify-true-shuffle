import * as React from 'react'
import { Link } from 'react-router-dom'
import { getToken, makeRequest } from '../utils'

const Callback = () => {
  React.useEffect(() => {
    const url = new URL(window.location.href)
    const code = url.searchParams.get('code')
    getToken(code)
  })

  return (
    <div>
      <Link to="/topsongs">
        <button>View Top Songs</button>
      </Link>
      <Link to="/likedsongs">
        <button>View Liked Songs</button>
      </Link>
    </div>
  )
}

export default Callback
