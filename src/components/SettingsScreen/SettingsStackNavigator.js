import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation'
import SettingsContainer from './SettingsContainer'
import DeleteConfirm from './DeleteConfirm'

import { withMappedNavigationAndConfigProps } from 'react-navigation-props-mapper'

export default (SettingsStackNavigator = StackNavigator({
  SettingsContainer: { screen: SettingsContainer },
  DeleteConfirm: { screen: withMappedNavigationAndConfigProps(DeleteConfirm) },
}));
