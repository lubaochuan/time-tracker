import React, { Component } from "react"
import TaskListContainer from "./TaskListContainer"
import { StackNavigator } from "react-navigation"
import TaskEdit from "../StudentsScreen/TaskEdit"
import { withMappedNavigationAndConfigProps } from 'react-navigation-props-mapper'

export default (TasksStackNavigator = StackNavigator({
  TasksScreenRouter: { screen: TaskListContainer },
  TaskEdit: { screen: withMappedNavigationAndConfigProps(TaskEdit) },
}));
