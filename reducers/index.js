import { RECEIVE_DECKS, ADD_DECK, ADD_QUESTION } from '../actions'


export default function (state = {}, action) {
     switch (action.type) {
       case RECEIVE_DECKS :
         return {
           ...state,
           ...action.decks,
         }
       case ADD_DECK :
         return {
           ...state,
           ...action.deck,
         }
       case ADD_QUESTION :
         return {
           ...state,
           [action.deckName]: {
             ...state[action.deckName],
             questions: state[action.deckName].questions.concat(action.questiion)
           }
         }
       default :
         return state
     }
   }
