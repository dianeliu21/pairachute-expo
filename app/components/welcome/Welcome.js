import React, { Component } from 'react'
import {
  Button,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons'
import { NavigationActions } from 'react-navigation'
const constants = require('../../styles/constants.js')
const styles = require('../../styles/styles.js')

class Welcome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dismissWelcomeCheckbox: false,
    }
  }

  static navigationOptions = {
    header: null,
    tabBarIcon: ({tintColor}) => (
      <SimpleLineIcons name='home' size={26} color={tintColor} />
    ),
    tabBarLabel: 'Welcome'
  }

  componentDidMount() {
    this.props.registerForPushNotificationsAsync()
  }

  _renderStep3Text = () => {
    if (this.props.user.reflectionType === 'paired') {
      return <Text style={[styles.colorWhite]}>Chat with your partner about your reflections and give support!</Text>
    } else {
      return <Text style={[styles.colorWhite]}>Chat with your partner in the chat window tab!</Text>
    }
  }

  _toggleCheckbox () {
    this.setState({dismissWelcomeCheckbox: !this.state.dismissWelcomeCheckbox})
  }

  _goToHome () {
    NavigationActions.navigate({routeName: 'Home'})
  }

  render () {
    return (
      <View style={[styles.wrapper, styles.backgroundPastelBlue, {paddingTop: 100, alignItems: 'center'}]}>
        <Text style={[styles.f_30, styles.colorWhite]}>Welcome to Pairachute!</Text>
        <View style={styles.padding_50}>
          <View style={styles.padding_10}>
            <View style={styles.flexRowCenter}>
              <SimpleLineIcons name='bell' size={25} color='white' />
              <Text style={[styles.f_20, styles.padding_10, styles.colorWhite]}>Step 1:</Text>
            </View>
            <Text style={[styles.colorWhite]}>Receive notifications at 9:15am on Tuesday and Thursday to reflect.</Text>
          </View>
          <View style={styles.padding_10}>
            <View style={styles.flexRowCenter}>
              <SimpleLineIcons name='note' size={25} color='white' />
              <Text style={[styles.f_20, styles.padding_10, styles.colorWhite]}>Step 2:</Text>
            </View>
            <View>
              <Text style={[styles.colorWhite]}>
                Reflect on your progress in Pairachute or snooze for later in
                the day! All answers will be kept confidential.
              </Text>
            </View>
          </View>
          <View style={styles.padding_10}>
            <View style={styles.flexRowCenter}>
              <SimpleLineIcons name='bubbles' size={25} color='white' />
              <Text style={[styles.f_20, styles.padding_10, styles.colorWhite]}>Step 3:</Text>
            </View>
            {this._renderStep3Text()}
          </View>
        </View>
      </View>
    )
  }
}

// <TouchableHighlight
//   onPress={() => console.log('sup')}
//   underlayColor={'rgba(0,0,0,0)'}
// >
//   <Text>Got it! Don’t show me this again.</Text>
// </TouchableHighlight>
// <Button
//   onPress={ () => this.props.navToHome() }
//   title={'Get Started'}
// />

export default Welcome
