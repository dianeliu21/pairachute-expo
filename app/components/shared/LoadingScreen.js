import React, { Component } from 'react'
import {
  Text,
  View,
} from 'react-native'
const styles = require('../../styles/styles.js')


class LoadingScreen extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }
}

export default LoadingScreen
