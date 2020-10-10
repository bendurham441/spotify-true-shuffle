import * as React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Callback from '../routes/Callback'
import TopSongs from '../routes/TopSongs'
import LikedSongs from '../routes/LikedSongs'
import Landing from '../routes/Landing'

const App = () : React.FC => {
  return (
    <main>
      <Router>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route path="/callback">
            <Callback />
          </Route>
          <Route path="/topsongs">
            <TopSongs />
          </Route>
          <Route path="/likedsongs">
            <LikedSongs />
          </Route>
        </Switch>
      </Router>
    </main>
  )
}

export default App
