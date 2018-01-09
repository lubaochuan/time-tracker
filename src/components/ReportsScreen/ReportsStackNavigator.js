import React, { Component } from "react"
import StudentListContainer from "./StudentListContainer"
import { StackNavigator } from "react-navigation"
import MonthlyListContainer from "./MonthlyListContainer"
import ReportExport from "./ReportExport"

import { withMappedNavigationAndConfigProps } from 'react-navigation-props-mapper'

export default (ReportsStackNavigator = StackNavigator({
  StudentsScreenRouter: { screen: StudentListContainer },
  MonthlyList: { screen: withMappedNavigationAndConfigProps(MonthlyListContainer) },
  ReportExport: { screen: withMappedNavigationAndConfigProps(ReportExport) },
}))
