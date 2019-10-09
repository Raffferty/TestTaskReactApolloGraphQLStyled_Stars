import React, { Fragment } from 'react'
import GlobalStyle from './theme/globalStyle'
import Users from './containers/Users/Users'

const App = () => (
  <Fragment>
    <GlobalStyle />
    <Users query={`location:"Kharkiv, Ukraine" sort:followers-desc`} numberOfUsers={10} />
  </Fragment>
)

export default App
