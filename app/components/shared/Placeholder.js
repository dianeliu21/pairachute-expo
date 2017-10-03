import React, { Component } from 'react'
import {
  Text,
  View,
} from 'react-native'
const styles = require('../../styles/styles.js')


class Placeholder extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text>This is just a placeholder.</Text>
      </View>
    )
  }
}

export default Placeholder
