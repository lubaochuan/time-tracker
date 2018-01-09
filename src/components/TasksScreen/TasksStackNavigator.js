import React, { Component } from "react"
import { StackNavigator } from "react-navigation"
import TaskListContainer from "./TaskListContainer"
import TaskEdit from "../StudentsScreen/TaskEdit"
import TaskExport from "./TaskExport"
import { withMappedNavigationAndConfigProps } from 'react-navigation-props-mapper'

export default (TasksStackNavigator = StackNavigator({
  TasksScreenRouter: { screen: TaskListContainer },
  TaskEdit: { screen: withMappedNavigationAndConfigProps(TaskEdit) },
  TaskExport: { screen: withMappedNavigationAndConfigProps(TaskExport) },
}));
