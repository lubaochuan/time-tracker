import React, { Component } from 'react'
import { Container, Header, Title, Content, InputGroup, Input, List, Button,
  Body, Icon, Left, Right, ListItem, Text } from 'native-base'
import { Alert } from 'react-native'
import PropTypes from 'prop-types'

export default class StudentList extends Component {
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
        <Button transparent onPress={() => navigation.navigate("DrawerOpen")}>
          <Icon name="menu" />
        </Button>
      </Left>
      <Body>
        <Title>Students</Title>
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

  studentExist = (student) => {
    console.dir(this.props.students)
    return
  }

  edit(studentName, index) {
    this.navigate(()=>
      this.props.navigation.navigate(
        'StudentEdit',
        {initialValues: {name:studentName, index}, index, onSubmit: this.updateStudent}))
  }
  
  pickSubject(student){
    this.navigate(()=>
      this.props.navigation.navigate('SubjectList', {student}))
  }
  
  updateStudent = (values) => {
    name = values.name.trim()
    values.name = name
    // ensure student names are unique
    if (this.props.students.map(student=>student.name.trim()).indexOf(name) > -1){
      Alert.alert(
        'Student: '+name+" already exist.",
        null,
        [
          {text: 'Cancel'}
        ],
        { cancelable: false }
      )
    }else{
      if(values.index < 0){
        // init empty subject array
        delete values.index
        this.props.addStudent(values)
      }else{
        index = values.index
        delete values.index
        this.props.updateStudent(index, values)
      }
      this.props.navigation.goBack(null)
    }
  }

  confirmDelete = (index) => {
    Alert.alert(
      'Delete '+this.props.students[index].name+'?',
      null,
      [
        {text: 'Confirm', onPress: () => this.deleteStudent(index)},
        {text: 'Cancel'},
      ],
      { cancelable: false }
    )
  }
  
  deleteStudent = (index) => {
    this.props.removeStudent(index)
  }

  render() {
    return (
      <Container style={{backgroundColor: "#FFF"}}>
        <Content>
            {this.props.students.map((student, index) =>
            <ListItem icon
              disabled={this.state.disabled}
              key={index}
              onPress={() => this.pickSubject(student)}
              onLongPress={() =>
                Alert.alert(
                  'Quick Menu',
                  null,
                  [
                    {text: 'Edit', onPress: () => this.edit(student.name, index)},
                    {text: 'Delete', onPress: () => this.confirmDelete(index)},
                    {text: 'Cancel'},
                  ],
                  { cancelable: false }
                )}>
              <Left>
                <Button style={{ backgroundColor: '#007AFF' }}>
                  <Icon active name='person' />
                </Button>
              </Left>
              <Body>
                <Text>{student.name}</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>)}
        </Content>

        <Button full onPress={() => this.edit('', -1)}>
          <Text>Add New Student</Text>
        </Button>
      </Container>
    )
  }
}
