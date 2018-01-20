import React, { Component } from "react"

import StudentsStackNavigator from './StudentsStackNavigator'
import RecordsStackNavigator from '../RecordsScreen/RecordsStackNavigator'
import ReportsStackNavigator from '../ReportsScreen/ReportsStackNavigator'
import SettingsStackNavigator from '../SettingsScreen/SettingsStackNavigator'
import SideBar from "../SideBar/SideBar.js"
import { DrawerNavigator } from "react-navigation"

const StudentsScreenRouter = DrawerNavigator(
  {
    'Add Record': { screen: StudentsStackNavigator },
    'All Records': { screen: RecordsStackNavigator },
    Reports: { screen: ReportsStackNavigator },
    Settings: { screen: SettingsStackNavigator },
  },
  {
    contentComponent: props => <SideBar {...props} />,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
  }
)

export default StudentsScreenRouter
