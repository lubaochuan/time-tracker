import React, { Component } from "react"
import StudentListContainer from "./StudentListContainer"
import { StackNavigator } from "react-navigation"
import MonthlyListContainer from "./MonthlyListContainer"

import { withMappedNavigationAndConfigProps } from 'react-navigation-props-mapper'

export default (ReportsStackNavigator = StackNavigator({
  StudentsScreenRouter: { screen: StudentListContainer },
  MonthlyList: { screen: withMappedNavigationAndConfigProps(MonthlyListContainer) },
}))
