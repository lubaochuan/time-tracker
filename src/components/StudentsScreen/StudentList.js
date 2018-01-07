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

  edit(student, index) {
    this.navigate(()=>
      this.props.navigation.navigate(
        'StudentEdit',
        {initialValues: {...student, index}, index, onSubmit: this.update}))
  }
  
  pickSubject(student){
    this.navigate(()=>
      this.props.navigation.navigate('SubjectList', {student}))
  }
  
  update = (values) => {
    console.log('Submitted!', JSON.stringify(values))
    name = values.name.trim()
    // ensure student names are unique
    if (this.props.students.map(x => x.name===name).reduce((a,b)=>a||b)){
      Alert.alert(
        'Student: '+name+" already exist.",
        null,
        [
          {text: 'Cancel'}
        ],
        { cancelable: false }
      )
    }else{
      values.name = name
      if(values.index < 0){
        this.props.addStudent(values)
      }else{
        this.props.updateStudent(values.index, values)
      }
      this.props.navigation.goBack(null)
    }
  }
  
  render() {
    return (
      <Container>
        <Content>
          <List>
            {this.props.students.map((student, index) =>
            <ListItem
              disabled={this.state.disabled}
              key={index}
              onPress={() => this.pickSubject(student)}
              onLongPress={() =>
                Alert.alert(
                  'Quick Menu',
                  null,
                  [
                    {text: 'Edit', onPress: () => this.edit(student, index)},
                    {text: 'Cancel'}
                  ],
                  { cancelable: false }
                )}>
              <Body>
                <Text>{student.name}</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>)}
          </List>
        </Content>

        <Button block onPress={() => this.edit({}, -1)}>
          <Text>Add New Student</Text>
        </Button>
      </Container>
    )
  }
}
