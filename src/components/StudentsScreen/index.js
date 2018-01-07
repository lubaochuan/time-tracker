import React, { Component } from "react"

import StudentsStackNavigator from './StudentsStackNavigator'
import TasksStackNavigator from '../TasksScreen/TasksStackNavigator'
import ReportsScreen from '../ReportsScreen/ReportsScreen'
import SideBar from "../SideBar/SideBar.js"
import { DrawerNavigator } from "react-navigation"

const StudentsScreenRouter = DrawerNavigator(
  {
    Students: { screen: StudentsStackNavigator },
    'All Tasks': { screen: TasksStackNavigator },
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
