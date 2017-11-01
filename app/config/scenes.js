import { TabNavigator } from 'react-navigation'

import ChangePasswordContainer from '../components/settings/ChangePasswordContainer'
import DummyLoginContainer from '../components/auth/DummyLoginContainer'
import MessagesTabContainer from '../components/messages/MessagesTabContainer'
import MessageThreadContainer from '../components/messages/MessageThreadContainer'
import LoginContainer from '../components/auth/LoginContainer'
import SettingsContainer from '../components/settings/SettingsContainer'
import SignupContainer from '../components/auth/SignupContainer'
import WelcomeContainer from '../components/welcome/WelcomeContainer'

import ChatTabContainer from '../components/messages/ChatTabContainer'
import ReflectionTabContainer from '../components/messages/ReflectionTabContainer'
import ReflectionAndChatTabContainer from '../components/messages/ReflectionAndChatTabContainer'

import * as constants from '../styles/constants'

const MainScreenNavigatorPaired = TabNavigator({
  WelcomeTab: { screen: WelcomeContainer },
  ReflectionAndChatTab: { screen: ReflectionAndChatTabContainer },
  SettingsTab: { screen: SettingsContainer },
}, {
  initialRouteName: 'WelcomeTab',
  tabBarOptions: {
    activeTintColor: constants.teal
  }
})

const MainScreenNavigatorSolo = TabNavigator({
  WelcomeTab: { screen: WelcomeContainer },
  ReflectionTab: { screen: ReflectionTabContainer },
  ChatTab: { screen: ChatTabContainer },
  SettingsTab: { screen: SettingsContainer },
}, {
  initialRouteName: 'WelcomeTab',
  tabBarOptions: {
    activeTintColor: constants.teal
  }
})

export const StackRouteConfigs = {
  DummyLogin: { screen: DummyLoginContainer },
  PairedHome: { screen: MainScreenNavigatorPaired },
  SoloHome: { screen: MainScreenNavigatorSolo },
  Login: { screen: LoginContainer },
  Message: { screen: MessageThreadContainer },
  Signup: { screen: SignupContainer },
  Welcome: { screen: WelcomeContainer },
  ChangePassword: { screen: ChangePasswordContainer}
}

module.exports = StackRouteConfigs
