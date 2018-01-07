import React, { Component } from "react"
import StudentListContainer from "./StudentListContainer"
import SubjectListContainer from "./SubjectListContainer"
import { StackNavigator } from "react-navigation"
import StudentEdit from "./StudentEdit"
import SubjectEdit from "./SubjectEdit"
import TaskEdit from "./TaskEdit"
import { withMappedNavigationAndConfigProps } from 'react-navigation-props-mapper'

export default (StudentsStackNavigator = StackNavigator({
  StudentsScreenRouter: { screen: StudentListContainer },
  SubjectList: { screen: withMappedNavigationAndConfigProps(SubjectListContainer) },
  StudentEdit: { screen: withMappedNavigationAndConfigProps(StudentEdit) },
  SubjectEdit: { screen: withMappedNavigationAndConfigProps(SubjectEdit) },
  TaskEdit: { screen: withMappedNavigationAndConfigProps(TaskEdit) },
  /*Detail: { screen: withMappedNavigationAndConfigProps(Detail) },*/
}));
