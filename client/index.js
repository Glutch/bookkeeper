import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'

import Main from './components/Main'


const render = () => {
  ReactDOM.render(
    <AppContainer>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </AppContainer>,
    document.getElementById('root')
  )
}

render()

if (module.hot) {
  module.hot.accept('./components/Main', render)
}