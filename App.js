import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { View, StatusBar} from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { createStackNavigator } from '@react-navigation/stack';
import { purple, white } from './utils/colors'
import Constants from 'expo-constants'
import DeckList from './components/DeckList'
import DeckHomePage from './components/DeckHomePage'
import DeckQuiz from './components/DeckQuiz'
import QuizResults from './components/QuizResults'
import NewDeck from './components/NewDeck'
import NewQuestion from './components/NewQuestion'
import { setLocalNotification } from './utils/helpers'

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Stack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={DeckList}
        options={{
          headerTintColor: white,
          headerStyle: {
            backgroundColor: purple,
        }}}
      />
      <Stack.Screen
        name="DeckHomePage"
        component={DeckHomePage}
        options={({ route }) => ({
          title: route.params.deckName,
          headerTintColor: white,
          headerStyle: {
            backgroundColor: purple,
        }})}
      />
      <Stack.Screen
        name="DeckQuiz"
        component={DeckQuiz}
        options={({ route }) => ({
          title: route.params.deckName + " Quiz",
          headerTintColor: white,
          headerStyle: {
            backgroundColor: purple,
        }})}
      />
      <Stack.Screen
        name="QuizResults"
        component={QuizResults}
        options={({ route }) => ({
          title: "Results",
          headerTintColor: white,
          headerStyle: {
            backgroundColor: purple,
        }})}
      />
      <Stack.Screen
        name="NewDeck"
        component={NewDeck}
        options={({ route }) => ({
          title: "Add A Quiz ",
          headerTintColor: white,
          headerStyle: {
            backgroundColor: purple,
        }})}
      />
      <Stack.Screen
        name="NewQuestion"
        component={NewQuestion}
        options={({ route }) => ({
          title: "Add A Question ",
          headerTintColor: white,
          headerStyle: {
            backgroundColor: purple,
        }})}
      />
    </Stack.Navigator>
  );
}


export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  
  render() {
    return (
      <NavigationContainer>
        <Provider store={createStore(reducer)}>
          <View style={{flex: 1}}>
            <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
            <MainStack/>
          </View>
        </Provider>
      </NavigationContainer>
    )
  }
}
