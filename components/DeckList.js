import React, { Component } from 'react'
import { ScrollView, View, TouchableOpacity, Text, StyleSheet, Animated} from 'react-native'
import { connect } from 'react-redux'
import { updateList } from '../utils/api.js'
import {receiveDecks } from '../actions'
import { purple, white } from '../utils/colors'
import { Ionicons } from '@expo/vector-icons';
import { Materialicons } from '@expo/vector-icons';

class DeckList extends Component {

  state = {
    bounceValue: new Animated.Value(1),
  }

  componentDidMount() {
    const { decks, dispatch } = this.props

    updateList().then((decks) => dispatch(receiveDecks(decks)))
  }

  render() {
    const { decks } =  this.props
    const { bounceValue } = this.state

    return (
      <ScrollView>
        {Object.keys(decks).map((key) => {
          const {title, questions } = decks[key]

          return (
            <View key={key}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  Animated.sequence([
                    Animated.timing(bounceValue, { duration: 200, toValue: 1.04}),
                    Animated.spring(bounceValue, { toValue: 1, friction: 4})
                  ]).start()
                  this.props.navigation.navigate(
                  'DeckHomePage',
                  { deckName: key }
                )}}>
                <Animated.Text
                  style={[styles.direction, {transform: [{scale: bounceValue}]}]}>
                    {title}
                </Animated.Text>
                <Text style={styles.direction}>{questions.length} cards</Text>
              </TouchableOpacity>
            </View>
          )
        })}
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('NewDeck')}>
          <View>
            <Text style={styles.direction}>
              <Ionicons name="ios-add-circle" size={20} color={white} />  Add A New Deck
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
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
  }
})

function mapStateToProps(state) {
  return {
    decks: state
  }
}

export default connect(mapStateToProps)(DeckList)
