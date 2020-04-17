import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet,
  Platform, TextInput, KeyboardAvoidingView
} from 'react-native'
import TextButton from './TextButton'
import { connect } from 'react-redux'
import { green, black, red, white } from '../utils/colors'
import { addQuestion } from '../actions'




class NewQuestion extends Component {
  state = {
    question: '',
    answer: ''
  }

  handleQuestionChange = (question) => {
    console.log("QUESTION:   ----   ", question)
    this.setState({
      question
    })
  }

  handleAnswerChange = (answer) => {
    console.log("ANSWER:   ----   ", answer)
    this.setState({
      answer
    })
  }
  submit = () => {
    const { dispatch } = this.props
    const { question, answer } = this.state
    const { deckName } = this.props.route.params

    const questiion = {
      question: question,
      answer: answer,
      guess: ''
    }


    dispatch(addQuestion(deckName, questiion)) &&
    this.props.navigation.navigate('Home')
  }
  toHome = () => {
    this.props.navigation.navigate('Home')
  }

  render() {
    const { question, answer } = this.state
    console.log("ROUTE PARAMS TO NEW QUESTION   ", this.props.route.params)

    return (
      <KeyboardAvoidingView>
        <Text>What's the name of the new question?</Text>
        <TextInput
          value={question}
          style={{ height: 30, borderWidth: 2, borderColor: green}}
          onChangeText={this.handleQuestionChange}
        />
        <Text>What's the answer? (Note: Yes or No only)</Text>
        <TextInput
          value={answer}
          style={{ height: 30, borderWidth: 2, borderColor: green}}
          onChangeText={this.handleAnswerChange}
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


export default connect()(NewQuestion)
