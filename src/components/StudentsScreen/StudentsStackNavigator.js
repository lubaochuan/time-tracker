import React, { Component } from "react"
import StudentListContainer from "./StudentListContainer"
import SubjectListContainer from "./SubjectListContainer"
import { StackNavigator } from "react-navigation"
import StudentEdit from "./StudentEdit"
import SubjectEdit from "./SubjectEdit"
import RecordEdit from "./RecordEdit"
import { withMappedNavigationAndConfigProps } from 'react-navigation-props-mapper'

export default (StudentsStackNavigator = StackNavigator({
  StudentsScreenRouter: { screen: StudentListContainer },
  SubjectList: { screen: withMappedNavigationAndConfigProps(SubjectListContainer) },
  StudentEdit: { screen: withMappedNavigationAndConfigProps(StudentEdit) },
  SubjectEdit: { screen: withMappedNavigationAndConfigProps(SubjectEdit) },
  RecordEdit: { screen: withMappedNavigationAndConfigProps(RecordEdit) },
  /*Detail: { screen: withMappedNavigationAndConfigProps(Detail) },*/
}));
