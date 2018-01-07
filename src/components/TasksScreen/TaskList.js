import React, { Component } from 'react'
import { Container, Header, Title, Content, InputGroup, Input, List, Button,
  Body, Icon, Left, Right, Text, ListItem } from 'native-base'
import { Alert } from 'react-native'
import PropTypes from 'prop-types'
import moment from 'moment'

export default class TaskList extends Component {
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
        <Title>Records</Title>
      </Body>
      <Right />
      </Header>
    )
  })

  static propTypes = {
    updateTask: PropTypes.func,
    removeTask: PropTypes.func,
    tasls: PropTypes.array,
  }

  editTask(task, index) {
    this.navigate(()=>{
    students = this.props.students.map(item => item.name)
    subjects = this.props.subjects.map(item => item.name)

    // convert number type to string type
    duration = {duration:task.duration.toString()}
    task = {...task, ...duration}
    edit = true
    this.props.navigation.navigate(
      'TaskEdit',
      {initialValues:task, students, subjects, edit,
        onSubmit: (values)=>this.updateTask(index, values)})
    })
  }

  updateTask = (index, values) => {
    this.props.updateTask(index, values)
    this.props.navigation.goBack(null)
  }

  deleteTask = (index) => {
    this.props.removeTask(index)
    this.props.navigation.goBack(null)
  }

  render() {
    return (
      <Container>
        <Content>
          <List>
          {this.props.tasks.map((task, index) =>
          <ListItem
            key={index}
            onPress={() => this.editTask(task, index)}
            onLongPress={() =>
              Alert.alert(
                'Quick Menu',
                null,
                [
                  {text: 'Edit', onPress: () => this.editTask(task, index)},
                  {text: 'Delete', onPress: () => this.deleteTask(index)},
                  {text: 'Cancel'}
                ],
                { cancelable: false }
              )}>
            <Body>
              <Text>{task.student} / {task.subject}</Text>
              <Text note>
                {task.date} {"\n"}
                {task.duration} minutes {"\n"}
                {task.note}
              </Text>
            </Body>
          </ListItem>)}
          </List>
        </Content>
      </Container>
    )
  }
}
