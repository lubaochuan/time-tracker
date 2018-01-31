import React, { Component } from 'react'
import { Alert, Platform } from 'react-native'
import { Container, Header, Title, Content, InputGroup, Input, List, Button,
  Body, Icon, Left, Right, Text, ListItem } from 'native-base'
import PropTypes from 'prop-types'
import moment from 'moment'

export default class RecordList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isNavigating: false,
    }
  }

  // avoid double taps
  toggleNavigation() {
    this.state.isNavigating = false
  }

  navigate(go){
    if (this.state.isNavigating == false) {
      this.state.isNavigating = true
      go()
      setTimeout(this.toggleNavigation.bind(this), 500)
    }
  }

  static navigationOptions = ({ navigation, student }) => ({
    header: (
      <Header>
        <Left>
          <Button iconLeft transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
            <Text>{Platform.OS === 'ios' ? 'Back':''}</Text>
          </Button>
        </Left>
        <Body>
          <Title>Records</Title>
        </Body>
        <Right />
      </Header>
    )
  })

  static propTypes = {
    updateRecord: PropTypes.func,
    removeRecord: PropTypes.func,
    tasls: PropTypes.array,
  }

  editRecord(student, recordIndex) {
    this.navigate(()=>{
      subjects = student.subjects.map(subject=>subject.name)
      this.props.navigation.navigate(
      'RecordEdit',
      { initialValues: student.records[recordIndex],
        studentName: student.name, subjects,
        onSubmit: (values)=>this.updateRecord(student.name, recordIndex, values)})
    })
  }

  updateRecord = (studentName, recordIndex, values) => {
    this.props.updateRecord(recordIndex, {student: studentName, record: values})
    this.props.navigation.goBack(null)
  }

  confirmDelete = (index) => {
    studentName = this.props.student.name
    subjectName = this.props.student.records[index].subject
    Alert.alert(
      'Delete this '+subjectName+' record for '+studentName+'?',
      null,
      [
        {text: 'Confirm', onPress: () => this.deleteRecord(index, studentName)},
        {text: 'Cancel'},
      ],
      { cancelable: false }
    )
  }

  deleteRecord = (index, studentName) => {
    this.props.removeRecord(index, {student: studentName})
  }
  
  exportRecords(student) {
    this.navigate(()=>
      this.props.navigation.navigate('RecordExport', {student}))
  }

  render() {
    const { student } = this.props
    return (
      <Container style={{backgroundColor: "#FFF"}}>
        <Content>
          <List>
          {student.records.map((record, index) =>
          <ListItem
            key={index}
            onLongPress={() =>
              Alert.alert(
                'Quick Menu',
                null,
                [
                  {text: 'Edit', onPress: () => this.editRecord(student, index)},
                  {text: 'Delete', onPress: () => this.confirmDelete(index)},
                  {text: 'Cancel'}
                ],
                { cancelable: false }
              )}>
            <Body>
              <Text>{student.name} / {record.subject}</Text>
              <Text note>
                {record.date} {"\n"}
                {record.duration} minutes {"\n"}
                {record.note}
              </Text>
            </Body>
          </ListItem>)}
          </List>
        </Content>
        <Button full onPress={() => this.exportRecords(this.props.student)}>
          <Text>Export All Records</Text>
        </Button>
      </Container>
    )
  }
}
