import React, { Component } from 'react'
import {
  View, Text, TouchableOpacity, StyleSheet,
  Platform, TextInput, KeyboardAvoidingView
} from 'react-native'
import TextButton from './TextButton'
import { connect } from 'react-redux'
import { green, black, red, white } from '../utils/colors'
import { addDeck } from '../actions'




class NewDeck extends Component {
  state = {
    input: ''
  }

  handleChange = (input) => {
    this.setState({
      input
    })
  }
  submit = () => {
    const { dispatch } = this.props
    const { input } = this.state

    const deck = {
      [input]: {
        title: input,
        questions: [],
        score: 0,
        activeQuestionIndex: 0,
      }
    }

    dispatch(addDeck(deck)) &&
    this.props.navigation.navigate('DeckHomePage', { deckName: input })
  }

  toHome = () => {
    this.props.navigation.navigate('Home')
  }

  render() {
    const { input } = this.state

    return (
      <KeyboardAvoidingView>
        <Text>What's the name of the new deck?</Text>
        <TextInput
          value={input}
          style={{ height: 30, borderWidth: 2, borderColor: green}}
          onChangeText={this.handleChange}
        />
        <TextButton style={{margin: 20}} onPress={this.submit}>
          Submit
        </TextButton>
        <TextButton style={{margin: 20}} onPress={this.toHome}>
          Home
        </TextButton>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  iosSubmitBtnYes: {
    backgroundColor: green,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtnYes: {
    backgroundColor: green,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iosSubmitBtnNo: {
    backgroundColor: red,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtnNo: {
    backgroundColor: red,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: black,
    fontSize: 22,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
})


export default connect()(NewDeck)
