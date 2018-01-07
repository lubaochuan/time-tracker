import React, { Component } from "react"

import StudentsStackNavigator from './StudentsStackNavigator'
import TasksStackNavigator from '../TasksScreen/TasksStackNavigator'
import ReportsStackNavigator from '../ReportsScreen/ReportsStackNavigator'
import SideBar from "../SideBar/SideBar.js"
import { DrawerNavigator } from "react-navigation"

const StudentsScreenRouter = DrawerNavigator(
  {
    'Add Record': { screen: StudentsStackNavigator },
    'All Records': { screen: TasksStackNavigator },
    Reports: { screen: ReportsStackNavigator },
  },
  {
    contentComponent: props => <SideBar {...props} />,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
  }
)

export default StudentsScreenRouter
