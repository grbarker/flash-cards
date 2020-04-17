import React, { Component } from 'react'
import {
  View, Text, TouchableOpacity,
  StyleSheet, Platform, Animated
} from 'react-native'
import TextButton from './TextButton'
import { connect } from 'react-redux'
import { green, black, red, white, purple } from '../utils/colors'




class QuizResults extends Component {

  state = {
    bounceValue: new Animated.Value(1),
  }
  componentDidMount() {
    const { bounceValue } = this.state
    Animated.sequence([
      Animated.timing(bounceValue, { duration: 700, toValue: 1.12}),
      Animated.spring(bounceValue, { toValue: 1, friction: 4})
    ]).start()
  }

  toHome = () => {
    this.props.navigation.navigate('Home')
  }

  render() {
    const { deck, deckName, score } = this.props
    const { title, questions } = deck
    const { bounceValue } = this.state

    return (
      <View>
        <View>
          <Animated.Text
            style={[styles.text, {transform: [{scale: bounceValue}]}]}>
              You Finished the {deckName} Flashcards Quiz!
              </Animated.Text>
          <Text style={styles.text}>
            You Got {score} Questions Correct Out Of A Total Of {questions.length}
          </Text>
          <Text style={styles.text}>
            That Is A Score of {score / questions.length *100}%
          </Text>
        </View>
        <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate(
            'DeckHomePage',
            { deckName },
          )}>
          <Text style={styles.direction}>Back to Quiz Page</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate(
            'DeckQuiz',
            { deckName: deckName ,
              score: 0,
              activeQuestionIndex: 0
            },
          )}>
          <Text style={styles.direction}>Restart Quiz</Text>
        </TouchableOpacity>
          <TextButton style={{margin: 20}} onPress={this.toHome}>
            Home
          </TextButton>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  button: {
    padding: 10,
    backgroundColor: purple,
    alignSelf: 'center',
    borderRadius: 5,
    margin: 20,
  },
  text: {
    color: purple,
    fontSize: 20,
    padding: 10,
    marginRight: 20,
    marginLeft: 20,
    textAlign: 'center',
  },
  buttonText: {
    color: white,
    fontSize: 20,
  },
  direction: {
    color: white,
    fontSize: 20,
    textAlign: 'center',
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

function mapStateToProps (state, { route, navigation }) {
  const { deckName, score } = route.params

  return {
    deckName,
    score,
    deck: state[deckName]

  }
}

export default connect(
  mapStateToProps,
)(QuizResults)
