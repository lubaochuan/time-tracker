import React, { Component } from "react"

import StudentsStackNavigator from './StudentsStackNavigator'
import TasksStackNavigator from '../TasksScreen/TasksStackNavigator'
import MonthListContainer from '../ReportsScreen/MonthListContainer'
import SideBar from "../SideBar/SideBar.js"
import { DrawerNavigator } from "react-navigation"

const StudentsScreenRouter = DrawerNavigator(
  {
    Students: { screen: StudentsStackNavigator },
    'All Tasks': { screen: TasksStackNavigator },
    Reports: { screen: MonthListContainer },
  },
  {
    contentComponent: props => <SideBar {...props} />,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
  }
)

export default StudentsScreenRouter
