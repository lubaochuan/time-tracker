import React, { Component } from 'react'
import { AppLoading, Font } from 'expo'
import { createStore,  applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import { persistStore, autoRehydrate } from 'redux-persist'
import { AsyncStorage } from 'react-native'
import allReducers from './reducers/index'
import StudentsScreen from "./components/StudentsScreen/index.js"

const logger = createLogger()
const store = createStore(allReducers, applyMiddleware(logger), autoRehydrate())

export default class Index extends Component {
  state = {
    isReady: false
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf")
    })
  }
  
  componentDidMount() {
    persistStore(
      store,
      {
        storage: AsyncStorage,
        whitelist: ['main']
      },
      () => {
        this.setState({ isReady: true })
      }
    )
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />
    }
    return (
      <Provider store={store} >
        <StudentsScreen />
      </Provider>
    )
  }
}
