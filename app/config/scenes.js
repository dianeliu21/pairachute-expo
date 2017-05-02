import { TabNavigator } from 'react-navigation'

import ContactsTabContainer from '../components/contacts/ContactsTabContainer'
import DummyLoginContainer from '../components/auth/DummyLoginContainer'
import MessagesTabContainer from '../components/messages/MessagesTabContainer'
import MessageThreadContainer from '../components/messages/MessageThreadContainer'
import LoginContainer from '../components/auth/LoginContainer'
import SignupContainer from '../components/auth/SignupContainer'

const MainScreenNavigator = TabNavigator({
  MessagesTab: { screen: MessagesTabContainer },
  ContactsTab: { screen: ContactsTabContainer }
}, {
  initialRouteName: 'MessagesTab',
  tabBarOptions: {
    activeTintColor: 'blue'
  }
})

export const StackRouteConfigs = {
  DummyLogin: { screen: DummyLoginContainer },
  Home: { screen: MainScreenNavigator },
  Login: { screen: LoginContainer },
  Message: { screen: MessageThreadContainer },
  Signup: { screen: SignupContainer }
}

module.exports = StackRouteConfigs
