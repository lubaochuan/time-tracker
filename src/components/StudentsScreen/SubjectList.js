import React, { Component } from 'react'
import { Alert, Platform } from 'react-native'
import { Container, Header, Title, Content, InputGroup, Input, List, Button,
  Body, Icon, Left, Right, ListItem, Text } from 'native-base'
import PropTypes from 'prop-types'
import moment from 'moment'

export default class SubjectList extends Component {
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
          <Title>Subjects</Title>
        </Body>
        <Right />
      </Header>
    )
  })

  static propTypes = {
    addSubject: PropTypes.func,
    updateSubject: PropTypes.func,
    removeSubject: PropTypes.func,
  }
  
  editSubject(studentName, subject, index) {
    this.navigate(()=>
    this.props.navigation.navigate(
      'SubjectEdit',
      {initialValues: {...subject, index}, index, studentName, onSubmit: this.updateSubject}))
  }

  uniqueSubjectName(subjects, newSubject) {
    name = newSubject.name.trim()
    if (subjects.map(subject=>subject.name).indexOf(name) > -1){
      return false
    }else{
      return true
    }
  }

  updateSubject = (values) => {
    /* remove extra spaces */
    subjectName = values.name.trim()
    subjectIndex = values.index
    delete values.index
    values.name = subjectName
    const { student } = this.props

    if(subjectIndex < 0){
      /* add new subject to student */
      if (!this.uniqueSubjectName(student.subjects, values)){
        Alert.alert(
          'Subject: '+subjectName+" already exist.",
          null,
          [
            {text: 'Cancel'}
          ],
          { cancelable: false }
        )
      }else{
        this.props.addSubject({student: student.name, subject: values})
      }
    }else{
      otherSubjects = [
        ...student.subjects.slice(0, subjectIndex),
        ...student.subjects.slice(subjectIndex + 1)]
      if (!this.uniqueSubjectName(otherSubjects, values)){
        Alert.alert(
          'Subject: '+subjectName+" already exist.",
          null,
          [
            {text: 'Cancel'}
          ],
          { cancelable: false }
        )
      }else{
        this.props.updateSubject(subjectIndex, {student: student.name, subject: values})
      }
    }
    this.props.navigation.goBack(null)
  }

  newRecord(student, subjectName) {
    this.navigate(() => {
      subjects = student.subjects.map(subject=>subject.name)
      this.props.navigation.navigate(
        'RecordEdit',
        {initialValues: {
          subject: subjectName, date: new moment().format("YYYY-MM-DD"), note: ''},
        studentName: student.name,
        subjects,
        onSubmit: (values) => this.addRecord(student.name, values)})
    })}

  addRecord = (studentName, values) => {
    this.props.addRecord({student: studentName, record: values})
    this.props.navigation.goBack(null)
  }
  
  confirmDelete = (index) => {
    studentName = this.props.student.name
    subjectName = this.props.student.subjects[index].name
    Alert.alert(
      'Delete '+subjectName+' for '+studentName+'?\n'+
      'Records associated with '+subjectName+' will stay.',
      null,
      [
        {text: 'Confirm', onPress: () => this.deleteSubject(index, studentName)},
        {text: 'Cancel'},
      ],
      { cancelable: false }
    )
  }

  deleteSubject = (index, studentName) => {
    this.props.removeSubject(index, {student: studentName})
  }

  render() {
    console.log(this.props.student.subjects)
    return (
      <Container style={{backgroundColor: "#FFF"}}>
        <Content>
          <List>
            {this.props.student.subjects.map((subject, index) =>
            <ListItem icon
              key={index}
              onPress={() => this.newRecord(this.props.student, subject.name)}
              onLongPress={() =>
                Alert.alert(
                  'Quick Menu',
                  null,
                  [
                    {text: 'Edit',
                     onPress: () => this.editSubject(this.props.student.name, subject, index)},
                    {text: 'Delete', onPress: () => this.confirmDelete(index)},
                    {text: 'Cancel'},
                  ],
                  { cancelable: false }
                )}>
              <Left>
                <Button style={{ backgroundColor: subject.core?'#FFD700':'#007AFF' }}>
                  <Icon active name="book" />
                </Button>
              </Left>
              <Body>
                <Text>{subject.name}</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>)}
          </List>
        </Content>

        <Button full
          onPress={() => this.editSubject(this.props.student.name, {core:false}, -1)}>
          <Text>Add New Subject</Text>
        </Button>
      </Container>
    )
  }
}
