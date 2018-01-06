import React, { Component } from 'react'
import { Container, Header, Title, Content, InputGroup, Input, List, Button,
  Body, Icon, Left, Right, ListItem, Text } from 'native-base'
import { Alert } from 'react-native'
import PropTypes from 'prop-types'
import moment from 'moment'

export default class SubjectList extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Subjects</Title>
        </Body>
        <Right />
      </Header>
    )
  });

  static propTypes = {
    addStudent: PropTypes.func,
    updateStudent: PropTypes.func,
    removeStudent: PropTypes.func,
    students: PropTypes.array,
  }
  
  edit(subject, index) {
    this.props.navigation.navigate(
      'SubjectEdit',
      {initialValues: {...subject, index}, index, onSubmit: this.update})
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

  openTask(student, subject) {
    this.props.navigation.navigate(
      'TaskEdit',
      {initialValues: {student: student.name, subject: subject.name,
        date: new moment().format("YYYY-MM-DD")},
        student, subject, onSubmit: this.addTask})
  }
    
  addTask = (values) => {
    this.props.addTask(values)
    this.props.navigation.goBack(null)
  }

  render() {
    return (
      <Container>
        <Content>
          <List>
            {this.props.subjects.map((subject, index) =>
            <ListItem
              onPress={() => this.openTask(this.props.student, subject)}
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
              <Body>
                <Text>{subject.name}</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>)}
          </List>
        </Content>

        <Button block onPress={() => this.edit({}, -1)}>
          <Text>Add New Subject</Text>
        </Button>
      </Container>
    )
  }
}
