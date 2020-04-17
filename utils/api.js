import { AsyncStorage } from 'react-native'

const FLASHCARD_LIBRARY_STORAGE_KEY = 'Flashcards: library'
const INITIAL_DECKS =   {
  'Thermodynamics': {
    'title': 'Thermodynamics',
    'questions': [
      {
        'question': 'Is an isobaric process a thermodynamic process in which the pressure stays constant: ΔP = 0?',
        'answer': 'Yes',
        'guess': '',
      },
      {
        'question': 'Is an isothermal process a thermodynamic process in which the temperature stays constant: ΔT= 0?',
        'answer': 'Yes',
        'guess': '',
      },
      {
        'question': 'Does the valume change in an isochoric process?',
        'answer': 'No',
        'guess': '',
      },
      {
        'question': 'In an adiabatic process is there any heat transfer between the thermodynamic system and its surroundings?',
        'answer': 'No',
        'guess': '',
      }
    ],
    'score': 0,
    'activeQuestionIndex': 0,
  },
  'Space': {
    'title': 'Space',
    'questions': [
      {
        'question': 'Something about planets, answer yes',
        'answer': 'Yes',
        'guess': '',
      },
      {
        'question': 'Something about planets, answer no',
        'answer': 'No',
        'guess': '',
      },
      {
        'question': 'Something about planets, answer yes',
        'answer': 'Yes',
        'guess': '',
      },
      {
        'question': 'Something about planets, answer no',
        'answer': 'No',
        'guess': '',
      }
    ],
    'score': 0,
    'activeQuestionIndex': 0,
  },
  'Deck3': {
    'title': 'Deck3',
    'questions': [
      {
        'question': 'Something about something, answer yes',
        'answer': 'Yes',
        'guess': '',
      },
      {
        'question': 'Something about something, answer no',
        'answer': 'No',
        'guess': '',
      },
      {
        'question': 'Something about something, answer yes',
        'answer': 'Yes',
        'guess': '',
      },
      {
        'question': 'Something about something, answer no',
        'answer': 'No',
        'guess': '',
      }
    ],
    'score': 0,
    'activeQuestionIndex': 0,
  },
  'Deck4': {
    'title': 'Deck4',
    'questions': [
      {
        'question': 'Something about something, answer yes',
        'answer': 'Yes',
        'guess': '',
      },
      {
        'question': 'Something about something, answer no',
        'answer': 'No',
        'guess': '',
      },
      {
        'question': 'Something about something, answer yes',
        'answer': 'Yes',
        'guess': '',
      },
      {
        'question': 'Something about something, answer no',
        'answer': 'No',
        'guess': '',
      }
    ],
    'score': 0,
    'activeQuestionIndex': 0,
  },
}

export async function updateList () {
  let response = await AsyncStorage.getItem(FLASHCARD_LIBRARY_STORAGE_KEY);
  let decks = await JSON.parse(response) || JSON.parse(JSON.stringify(INITIAL_DECKS))
  return decks
}



 export function setAsyncStorage ({ deckName, key, entry }) {
  return AsyncStorage.mergeItem(FLASHCARD_LIBRARY_STORAGE_KEY, JSON.stringify({
    [deckName]: deck
  }))
 }
