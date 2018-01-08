import React, { Component } from 'react'
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
          <Button transparent iconLeft onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
            <Text>Back</Text>
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
    console.log('Submitted!', JSON.stringify(values))
    values.name = values.name.trim()
    
    if(values.index < 0){
      // ensure student names are unique
      if (this.props.subjects.map(x => x.name===values.name).reduce((a,b)=>a||b)){
        Alert.alert(
          'Subject: '+name+" already exist.",
          null,
          [
            {text: 'Cancel'}
          ],
          { cancelable: false }
        )
      }else{
        delete values.index
        this.props.addSubject(values)
      }
    }else{
      index = values.index
      delete values.index
      this.props.updateSubject(index, values)
    }
    this.props.navigation.goBack(null)
  }

  newTask(student, subject) {
    this.navigate(()=>{
    students = this.props.students.map(item => item.name)
    subjects = this.props.subjects.map(item => item.name)
    edit = false
    this.props.navigation.navigate(
      'TaskEdit',
      {initialValues: {student: student.name, subject: subject.name,
        date: new moment().format("YYYY-MM-DD")}, edit,
        students, subjects, onSubmit: this.addTask})})
  }

  addTask = (values) => {
    this.props.addTask(values)
    this.props.navigation.goBack(null)
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
                    {text: 'Cancel'}
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

        <Button full onPress={() => this.edit({}, -1)}>
          <Text>Add New Subject</Text>
        </Button>
      </Container>
    )
  }
}
