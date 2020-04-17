export const RECEIVE_DECKS  = 'DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}
export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}
export function addQuestion (deckName, questiion) {
  return {
    type: ADD_QUESTION,
    deckName,
    questiion,
  }
}
