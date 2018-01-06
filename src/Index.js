import React, { Component } from 'react'
import { createStore,  applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import allReducers from './reducers/index'
import StudentsScreen from "./components/StudentsScreen/index.js"

const config = {
  key: 'root',
  blacklist: ['form'],
  storage,
}

const reducer = persistCombineReducers(config, allReducers)
const logger = createLogger()
const store = createStore(allReducers, applyMiddleware(logger))
persistStore(store)

export default class Index extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    }
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf")
    })
    this.setState({ isReady: true })
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />
    }
    return (
      <Provider store={store} >
        <StudentsScreen />
      </Provider>
    )
  }
}
