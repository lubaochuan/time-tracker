import React, { Component } from "react"
import ListContainer from "./ListContainer.js"
import { StackNavigator } from "react-navigation"
import { withMappedNavigationAndConfigProps } from 'react-navigation-props-mapper'

export default (StudentsStackNavigator = StackNavigator({
  StudentsScreenRouter: { screen: ListContainer},
/*  Edit: { screen: withMappedNavigationAndConfigProps(TodoEdit) },
  Detail: { screen: withMappedNavigationAndConfigProps(Detail) },*/
}));
