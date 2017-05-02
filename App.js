import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import configureStore from './app/config/configureStore'

import AppWithNavigationState from './app/config/AppNavigator'

// Redux store
const store = configureStore()

class PairachuteApp extends Component {
  render () {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('PairachuteApp', () => PairachuteApp)
export default PairachuteApp
