import React, { Component } from 'react'
import {
  View, Text, TouchableOpacity, StyleSheet, Platform
} from 'react-native'
import TextButton from './TextButton'
import { connect } from 'react-redux'
import { green, black, red, white, purple, lightPurp } from '../utils/colors'
import {
  getDailyReminderValue,
  clearLocalNotification,
  setLocalNotification
} from '../utils/helpers'


function MarkCorrect ({ onPress }) {
  return (
    <TouchableOpacity
      style={
        Platform.OS === 'ios'
        ? styles.iosSubmitBtnYes
        : styles.AndroidSubmitBtnYes
      }
      onPress={onPress}>
        <Text style={styles.submitBtnText}>Correct</Text>
    </TouchableOpacity>
  )
}

function MarkIncorrect ({ onPress }) {
  return (
    <TouchableOpacity
      style={
        Platform.OS === 'ios'
        ? styles.iosSubmitBtnNo
        : styles.AndroidSubmitBtnNo
      }
      onPress={onPress}>
        <Text style={styles.submitBtnText}>Incorrect</Text>
    </TouchableOpacity>
  )
}


class DeckQuiz extends Component {

  state = {
    showingAnswer: false,
  }

  componentDidMount() {
    clearLocalNotification().then(setLocalNotification)
  }

  toggleAnswer = () => {
    this.setState({
      showingAnswer: !this.state.showingAnswer
    })
  }

  markGuess = (guess) => {
    const {
      navigation, score, activeQuestionIndex, deck, deckName
    } =  this.props
    const { questions } = deck
    const { question, answer } = deck.questions[activeQuestionIndex]
    const endQuiz = questions.length-1 === activeQuestionIndex ? true : false


    if (guess === 'correct' && !endQuiz) {
      this.props.navigation.navigate(
        'DeckQuiz',
        {
          deckName: deckName,
          score: score+1,
          activeQuestionIndex: activeQuestionIndex+1
        }
      )
    } else if (guess === 'incorrect' && !endQuiz) {
      this.props.navigation.navigate(
        'DeckQuiz',
        {
          deckName: deckName,
          score: score,
          activeQuestionIndex: activeQuestionIndex+1
        }
      )
    } else if (guess === 'correct' && endQuiz) {
      this.props.navigation.navigate(
        'QuizResults',
        { deckName: deckName, score: score+1}
      )
    } else if (guess === 'incorrect' && endQuiz) {
      this.props.navigation.navigate(
        'QuizResults',
        { deckName: deckName, score: score}
      )
    } else {
      console.log("SOMEHOW THE NAVIGATING THROUGH THE DECK IS NOT WORKING")
    }
  }

  toHome = () => {
    this.props.navigation.navigate('Home')
  }

  render() {
    const { deck, deckName, score, activeQuestionIndex } = this.props
    const { title, questions } = deck
    const { question, answer } = questions[activeQuestionIndex]

    return (
      <View>
        <View style={styles.info}>
          <Text style={styles.infoText}>Score: {score}</Text>
          <Text style={styles.infoText}>
            {questions.length - (activeQuestionIndex + 1)} questions left
          </Text>
        </View>
        <View style={styles.questionContainer}>
          <Text style={styles.text}>{question}</Text>
          {this.state.showingAnswer
            ? <View>
                <Text style={styles.answerText}>Answer:  {answer}</Text>
              </View>
            : null
          }
        </View>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={this.toggleAnswer}>
            <View>
              <Text style={styles.direction}>
                {this.state.showingAnswer ? "Hide Answer" : "Show Answer"}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.markGuessContainer}>
            <MarkCorrect onPress={() => this.markGuess('correct')} />
            <MarkIncorrect onPress={() => this.markGuess('incorrect')} />
          </View>
          <TextButton style={{margin: 20}} onPress={this.toHome}>
            Home
          </TextButton>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  questionContainer: {
    padding: 10,
    marginRight: 20,
    marginLeft: 20
  },
  markGuessContainer: {
    padding: 10,
    marginRight: 10,
    marginLeft: 10,
    alignItems: 'stretch',
  },
  button: {
    padding: 10,
    backgroundColor: purple,
    alignSelf: 'center',
    borderRadius: 5,
    margin: 20,
  },
  buttonText :{
    color: white,
    fontSize: 20,
  },
  direction: {
    color: white,
    fontSize: 20,
    textAlign: 'center',
  },
  infoText: {
    flex:1,
    color: purple,
    fontSize: 20,
    padding: 10,
    textAlign: 'center',
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    borderColor: purple,
    borderWidth: 3,
  },
  text: {
    color: purple,
    fontSize: 20,
    padding: 10,
    marginRight: 20,
    marginLeft: 20
  },
  answerText: {
    alignSelf: 'center',
    color: lightPurp,
    fontSize: 30,
  },
  info: {
    height: 90,
    paddingBottom: 10,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    width: 300,
    backgroundColor: green,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  iosSubmitBtnNo: {
    backgroundColor: red,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtnNo: {
    width: 300,
    backgroundColor: red,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'center',
    justifyContent: 'center',
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

function mapStateToProps (state, { route, navigation }) {
  const { deckName, score, activeQuestionIndex } = route.params

  return {
    deckName,
    score,
    activeQuestionIndex,
    deck: state[deckName]

  }
}

export default connect(
  mapStateToProps,
)(DeckQuiz)
