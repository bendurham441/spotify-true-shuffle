import * as React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Callback from '../routes/Callback'
import Home from '../routes/Home'
import TopSongs from '../routes/TopSongs'
import LikedSongs from '../routes/LikedSongs'
import Landing from '../routes/Landing'

const App = () => {
  return (
    <main>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
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
          <Route path="/landing">
            <Landing />
          </Route>
        </Switch>
      </Router>
    </main>
  )
}

export default App
