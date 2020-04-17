import React from 'react'
import { View, StyleSheet, AsyncStorage } from 'react-native'
import { red, orange, blue, lightPurp, pink, white } from './colors'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'

const NOTIFICATION_KEY = 'Flashcards:notifications'

export function getDailyReminderValue () {
 return {
   today: "👋 Don't forget to take a quiz today!"
 }
}


export function getMetaInfo (deck) {
  const decks = {
    Thermo: {
      title: 'Thermodynamics',

      questions: [
        {
          question: 'Is an isobaric process a thermodynamic process in which the pressure stays constant: ΔP = 0?',
          answer: 'Yes'
        },
        {
          question: 'Is an isothermal process a thermodynamic process in which the temperature stays constant: ΔT= 0?',
          answer: 'Yes'
        },
        {
          question: 'Does the valume change in an isochoric process?',
          answer: 'No'
        },
        {
          question: 'In an adiabatic process is there any heat transfer between the thermodynamic system and its surroundings?',
          answer: 'No'
        }
      ]
    },
    Space: {
      title: 'Space',
      questions: [
        {
          question: 'Something about planets, answer yes',
          answer: 'Yes'
        },
        {
          question: 'Something about planets, answer no',
          answer: 'No'
        },
        {
          question: 'Something about planets, answer yes',
          answer: 'Yes'
        },
        {
          question: 'Something about planets, answer no',
          answer: 'No'
        }
      ]
    },
    Deck3: {
      title: 'Deck3',
      questions: [
        {
          question: 'Something about something, answer yes',
          answer: 'Yes'
        },
        {
          question: 'Something about something, answer no',
          answer: 'No'
        },
        {
          question: 'Something about something, answer yes',
          answer: 'Yes'
        },
        {
          question: 'Something about something, answer no',
          answer: 'No'
        }
      ]
    },
    Deck4: {
      title: 'Deck4',
      questions: [
        {
          question: 'Something about something, answer yes',
          answer: 'Yes'
        },
        {
          question: 'Something about something, answer no',
          answer: 'No'
        },
        {
          question: 'Something about something, answer yes',
          answer: 'Yes'
        },
        {
          question: 'Something about something, answer no',
          answer: 'No'
        }
      ]
    },
  }

  return typeof deck === 'undefined' ? decks : decks[deck]
}



export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: 'Take a quiz!',
    body: "👋 don't forget to take a quiz today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}
