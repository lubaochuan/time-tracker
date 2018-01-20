import React, { Component } from "react"
import { Container, Card, CardItem, Body, Content, Header, Left, Right, Icon,
  Title, Button, Text, ListItem, Item, Input, Label, Picker } from "native-base"
import { Field, reduxForm } from 'redux-form'

const ALL_RECORDS = 'All Records'
const ALL_STUDENTS = 'All Students'
const ALL_SUBJECTS = 'All Subjects'

export default class Settings extends React.Component {
  constructor(props){
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
        <Title>Settings</Title>
      </Body>
      <Right />
      </Header>
    )
  })

  confirmDelete = (title, description) => {
    this.navigate(()=>
      this.props.navigation.navigate(
        'DeleteConfirm',
        {title, description, onSubmit: (values) => this.delete(title)}))
  }

  delete = (title) => {
    switch (title) {
      case ALL_RECORDS:
        this.props.removeAllRecords()
        break
      case ALL_STUDENTS:
        this.props.removeAllStudents()
        break
      case ALL_SUBJECTS:
        this.props.removeAllSubjects()
        break
      default:
    }
    this.props.navigation.goBack(null)
  }

  render() {
    return (
      <Container>
        <Content padder style={{ padding: 20 }}>
          <Button block rounded primary style={{ marginBottom:20 }}
            onPress={() => this.confirmDelete(ALL_RECORDS,
              'delete all records but keep all students and all subjects.')}>
            <Text>Delete {ALL_RECORDS}</Text>
          </Button>
          <Button block rounded primary style={{ marginBottom:20 }}
            onPress={() => this.confirmDelete(ALL_SUBJECTS,
              'delete all subjects but keep all records and all students.')}>
            <Text>Delete {ALL_SUBJECTS}</Text>
          </Button>
          <Button block rounded primary style={{ marginBottom:20 }}
            onPress={() => this.confirmDelete(ALL_STUDENTS,
              'delete all students along with all subjects and all records.')}>
            <Text>Delete {ALL_STUDENTS}</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}
