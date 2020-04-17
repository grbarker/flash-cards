import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import TextButton from './TextButton'
import { connect } from 'react-redux'
import { purple, white } from '../utils/colors'
import { Ionicons } from '@expo/vector-icons';
import { Materialicons } from '@expo/vector-icons';

class DeckHomePage extends Component {

  toHome = () => {
    this.props.navigation.navigate('Home')
  }

  render() {
    const { decks, deckName, score, activeQuestionIndex } = this.props
    const { title, questions } = decks[deckName]

    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.text}>{title}</Text>
          <Text style={styles.text}>{questions.length} cards</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate(
            'DeckQuiz',
            { deckName: deckName ,
              score: score,
              activeQuestionIndex: activeQuestionIndex
            },
          )}>
          <Text style={styles.direction}>Start Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate(
            'NewQuestion',
            { deckName }
          )}>
          <Text style={styles.direction}>Add A New Question</Text>
        </TouchableOpacity>
        <TextButton style={{margin: 20}} onPress={this.toHome}>
          Home
        </TextButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
})

function mapStateToProps (state, { route, navigation }) {
  const { deckName } = route.params

  return {
    deckName,
    decks: state,
    score: state[deckName].score,
    activeQuestionIndex: state[deckName].activeQuestionIndex,

  }
}

export default connect(
  mapStateToProps,
)(DeckHomePage)
