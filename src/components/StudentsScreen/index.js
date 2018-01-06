import React, { Component } from "react"

import StudentsStackNavigator from './StudentsStackNavigator'
import ReportsScreen from "../ReportsScreen/ReportsScreen.js"
import SideBar from "../SideBar/SideBar.js"
import { DrawerNavigator } from "react-navigation"

const StudentsScreenRouter = DrawerNavigator(
  {
    Students: { screen: StudentsStackNavigator },
    Reports: { screen: ReportsScreen },
  },
  {
    contentComponent: props => <SideBar {...props} />,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
  }
)

export default StudentsScreenRouter
