import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation'
import StudentListContainer from './StudentListContainer'
import RecordListContainer from './RecordListContainer'
import RecordEdit from '../StudentsScreen/RecordEdit'
import RecordExport from './RecordExport'
import { withMappedNavigationAndConfigProps } from 'react-navigation-props-mapper'

export default (RecordsStackNavigator = StackNavigator({
  RecordsScreenRouter: { screen: StudentListContainer },
  RecordList: { screen: withMappedNavigationAndConfigProps(RecordListContainer) },
  RecordEdit: { screen: withMappedNavigationAndConfigProps(RecordEdit) },
  RecordExport: { screen: withMappedNavigationAndConfigProps(RecordExport) },
}));
