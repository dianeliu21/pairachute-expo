import React, {Component} from 'react'
import {
  Button,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import MessageBubble from './MessageBubble'
import MessageSuggestions from './MessageSuggestions'
import Prompt from './Prompt'
import PromptResponse from './PromptResponse'
const styles = require('../../../styles/styles.js')
const constants = require('../../../styles/constants.js')

class MessageThread extends Component {
  constructor (props) {
    super(props)
    this.state = {
      behavior: 'padding',
      data: [],
      height: 0,
      focusedPrompt: null,
      messageText: '',
      promptResponseText: '',
      screenWidth: 0,
      showSuggestions: false,
      showEncouragement: false,
    }
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.title
  })

  handlePickSuggestion = (messageText) => {
    this.setState({ messageText })
  }

  updateFocusedPrompt = (prompt) => {
    this.setState({ focusedPrompt: prompt })
  }

  _sendMessage () {
    this.props.sendMessage(this.state.messageText, this.props.user.uid, this.props.user.displayName, this.props.focusedThread.id)
    if (this.state.focusedPrompt) {
      this._toggleEncouragement()
    }
    this.setState({ messageText: '' })
  }

  _sendPromptResponse () {
    this.props.submitPromptResponse(this.state.focusedPrompt, this.state.promptResponseText, this.props.user.uid, this.props.focusedThread.id)
    this._toggleEncouragement()
    this.setState({ promptResponseText: '' })
  }

  _toggleEncouragement() {
    this.setState({ showEncouragement: !this.state.showEncouragement })
  }

  _updateInputHeight = (height) => {
    height = height > 125 ? 125 : height
    this.setState({
      height
    });
  }

  _renderLoadOldMessages = () => {
    return (
      <TouchableHighlight
        onPress={() => this.props.loadOldMessages(this.props.type, this.props.focusedThread.id, this.props.focusedThread.oldestMsgKey)}
        underlayColor={'rgba(255,255,255,0)'}
      >
        <View style={[styles.inverted, styles.loadOldMessageButton]}>
          <Text>Load previous messages</Text>
        </View>
      </TouchableHighlight>
    )
  }

  _renderMessageBubble (data) {
    if (data.item.senderId === 'prompt') {
      return (
        <View style={styles.inverted}>
          <Prompt
            data={data.item}
            senderId={this.props.user.uid}
            submitPromptResponse={this.props.submitPromptResponse}
            threadId={this.props.focusedThread.id}
            updateFocusedPrompt={this.updateFocusedPrompt}
          />
        </View>
      )
    } else if (data.item.senderId === 'promptResponse') {
      return (
        <View style={styles.inverted}>
          <PromptResponse
            users={this.props.focusedThread.users}
            senderId={this.props.user.uid}
            submitPromptResponse={this.props.submitPromptResponse}
            threadId={this.props.focusedThread.id}
            data={data.item}
          />
        </View>
      )
    } else {
      return (
        <View style={styles.inverted}>
          <MessageBubble
            users={this.props.focusedThread.users}
            senderId={this.props.user.uid}
            message={data.item}
          />
        </View>
      )
    }
  }

  _renderNormalTextInput = () => {
    return (
        <View style={[styles.flexRowEnd, styles.justifyContentCenter]}>
          <TouchableHighlight
            onPress={() => this._toggleShowSuggestions()}
            underlayColor={'rgba(255,255,255,0)'}
          >
            <View style={{marginBottom: 15, marginLeft: 20}}>
              <FontAwesome name='quote-right' size={25} color={constants.teal}/>
            </View>
          </TouchableHighlight>
          <ScrollView keyboardDismissMode='on-drag' keyboardShouldPersistTaps='never' style={styles.wrapper}>
            <TextInput
              multiline
              onChangeText={(messageText) => this.setState({messageText})}
              onContentSizeChange={(e) => this._updateInputHeight(e.nativeEvent.contentSize.height)}
              onFocus={() => this._hideSuggestions()}
              placeholder={'Type a message'}
              style={[styles.messageThreadInput, { height: this.state.height + 15, width: this.state.screenWidth - 130 }]}
              value={this.state.messageText}
            />
          </ScrollView>
          <View style={{paddingBottom: 10, paddingRight: 10}}>
            <Button
              onPress={() => this._sendMessage()}
              style={{margin: 0}}
              title={'Send'}
            />
          </View>
        </View>
    )
  }

  _renderPromptTextInput = () => {
    return (
      <View style={[styles.flexColumnCenter, styles.alignItemsStretch]}>
        <View style={[styles.backgroundTeal, styles.paddingTen]}>
          <Text style={[styles.smallHelpCenter, { color: 'white' }]}>You are currently answering the prompt:</Text>
          <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>{this.state.focusedPrompt.message}</Text>
          <TouchableHighlight
            style={styles.promptAnswerButton}
            onPress={() => this._clearFocusedPrompt()}
            underlayColor={'rgba(255,255,255,0)'}
          >
            <Text style={[styles.smallHelpCenter, {color: 'white'}]}>Done</Text>
          </TouchableHighlight>
        </View>
        <View style={[styles.flexRowEnd, styles.justifyContentCenter]}>
          <TouchableHighlight
            onPress={() => this._toggleShowSuggestions()}
            underlayColor={'rgba(255,255,255,0)'}
          >
            <View style={{marginBottom: 15, marginLeft: 20}}>
              <FontAwesome name='quote-right' size={25} color={constants.teal}/>
            </View>
          </TouchableHighlight>
          <ScrollView keyboardDismissMode='on-drag' keyboardShouldPersistTaps='never' style={styles.wrapper}>
          <TextInput
            multiline
            onChangeText={(promptResponseText) => this.setState({promptResponseText})}
            onContentSizeChange={(e) => this._updateInputHeight(e.nativeEvent.contentSize.height)}
            placeholder={'Type an answer'}
            style={[styles.messageThreadInput, { height: this.state.height + 15, width: this.state.screenWidth - 130}]}
            value={this.state.promptResponseText}
          />
          </ScrollView>
          <View style={{paddingBottom: 10, paddingRight: 10}}>
            <Button
              onPress={() => this._sendPromptResponse()}
              style={{margin: 0}}
              title={'Send'}
            />
          </View>
        </View>
      </View>
    )
  }

  _renderSuggestions = () => {
    return (
      <MessageSuggestions
        onPressSuggestion={this.handlePickSuggestion}
        screenWidth={this.state.screenWidth}
      />
    )
  }

  _renderPairName = () => {
    var name = "unknown"
    users = this.props.focusedThread.users
    if (users) {
      for (userKey in users) {
        if (userKey != this.props.user.uid) {
          name = users[userKey].name
        }
      }
    }
    return this.props.type !== 'reflectionOnly'
      ? "Paired with " + name
      : 'Solo';
  }

  _renderStreak () {
    return this.props.focusedThread.messages.length
  }

  _renderEncouragement() {
    return (
      <Modal
        style={styles.modalColor}
         animationType="slide"
         transparent={false}
         visible={this.state.showEncouragement}
         onRequestClose={() => {
           alert('Modal has been closed.');
         }}>
         <View style={styles.encouragementContainer}>
           <Text style={styles.encouragementText}>Great Job 🎉</Text>
           <Image
             style={styles.encouragementGif}
             source={require('../../../../resources/gifs/kid.gif')}/>
           <TouchableHighlight
             style={styles.encouragementButton}
             onPress={() => {this._toggleEncouragement()}}>
             <Text style={styles.encouragementButtonText}>Close</Text>
           </TouchableHighlight>
         </View>
       </Modal>
    )
  }

  render () {
    console.log(this.props.focusedThread.id)
      return (
        this.props.focusedThread.id ?
          (<KeyboardAvoidingView
            behavior={this.state.behavior}
            style={styles.wrapper}
            keyboardVerticalOffset={0}>
            { this.state.showEncouragement ? this._renderEncouragement() : null }
            <View
              onLayout={(e) => { this.setState({screenWidth: e.nativeEvent.layout.width}) }}
              style={[styles.wrapper, {paddingTop: 20}]}>
              <View
                style={[styles.banner, {width: this.state.screenWidth}]}>
                <View style={styles.bannerContainer}>
                  <Text style={styles.bannerText}>
                    {this._renderPairName()}
                  </Text>
                  <View style={styles.streakContainer}>
                    <Text style={styles.streakText}>{this._renderStreak()}</Text>
                    <Image
                      style={styles.streakIcon}
                      source={require('../../../../resources/streak.png')}/>
                  </View>
                </View>
               </View>
               <FlatList
                data={this.props.focusedThread.messages}
                ListFooterComponent={this._renderLoadOldMessages}
                ref={(component) => this._flatList = component}
                renderItem={(data) => this._renderMessageBubble(data)}
                style={[styles.inverted, styles.messageListContainer]}
               />
             </View>

            <View>
              { this.state.focusedPrompt ? this._renderPromptTextInput() : this._renderNormalTextInput() }
              { this.state.showSuggestions && this._renderSuggestions() }
            </View>
          </KeyboardAvoidingView>)
        : (<View style={styles.notPairedMessageContainer}>
            <Text style={styles.notPairedMessage}> Not paired with anyone.</Text>
           </View>)
      )
  }

  _clearFocusedPrompt() {
    this.setState({ focusedPrompt: null})
  }

  _hideSuggestions () {
    this.setState({ showSuggestions: false })
  }

  _toggleShowSuggestions() {
    this.setState({ showSuggestions: !this.state.showSuggestions })
  }
}


module.exports = MessageThread
