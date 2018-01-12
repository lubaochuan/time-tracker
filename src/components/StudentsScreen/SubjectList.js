import React, { Component } from 'react'
import { Platform } from 'react-native'
import { Container, Header, Title, Content, InputGroup, Input, List, Button,
  Body, Icon, Left, Right, ListItem, Text } from 'native-base'
import { Alert } from 'react-native'
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

  static navigationOptions = ({ navigation }) => ({
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
    addStudent: PropTypes.func,
    updateStudent: PropTypes.func,
    removeStudent: PropTypes.func,
    students: PropTypes.array,
  }
  
  edit(subject, index) {
    this.navigate(()=>
    this.props.navigation.navigate(
      'SubjectEdit',
      {initialValues: {...subject, index}, index, onSubmit: this.update}))
  }

  update = (values) => {
    name = values.name.trim()
    values.name = name
    // ensure student names are unique
    if (this.props.subjects.map(subject=>subject.name.trim()).indexOf(name) > -1){
      Alert.alert(
        'Subject: '+name+" already exist.",
        null,
        [
          {text: 'Cancel'}
        ],
        { cancelable: false }
      )
    }else{
      if(values.index < 0){
        delete values.index
        this.props.addSubject(values)
      }else{
        index = values.index
        delete values.index
        this.props.updateSubject(index, values)
      }
      this.props.navigation.goBack(null)
    }
  }

  newTask(student, subject) {
    this.navigate(()=>{
    students = this.props.students.map(student=>student.name)
    subjects = this.props.subjects.map(subject=>subject.name)
    edit = false
    this.props.navigation.navigate(
      'TaskEdit',
      {initialValues: {student: student.name, subject: subject.name,
        date: new moment().format("YYYY-MM-DD"),
        note: ''}, edit,
        students, subjects, onSubmit: this.addTask})})
  }

  addTask = (values) => {
    this.props.addTask(values)
    this.props.navigation.goBack(null)
  }
  
  confirmDelete = (index) => {
    Alert.alert(
      'Delete '+this.props.subjects[index].name+'?',
      null,
      [
        {text: 'Confirm', onPress: () => this.deleteSubject(index)},
        {text: 'Cancel'},
      ],
      { cancelable: false }
    )
  }

  deleteSubject = (index) => {
    this.props.removeSubject(index)
  }

  render() {
    return (
      <Container style={{backgroundColor: "#FFF"}}>
        <Content>
          <List>
            {this.props.subjects.map((subject, index) =>
            <ListItem icon
              key={index}
              onPress={() => this.newTask(this.props.student, subject)}
              onLongPress={() =>
                Alert.alert(
                  'Quick Menu',
                  null,
                  [
                    {text: 'Edit', onPress: () => this.edit(subject, index)},
                    {text: 'Delete', onPress: () => this.confirmDelete(index)},
                    {text: 'Cancel'},
                  ],
                  { cancelable: false }
                )}>
              <Left>
                <Button style={{ backgroundColor: "#007AFF" }}>
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

        <Button full onPress={() => this.edit({core:false}, -1)}>
          <Text>Add New Subject</Text>
        </Button>
      </Container>
    )
  }
}
