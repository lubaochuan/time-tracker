import React, { Component } from 'react'
import { Platform } from 'react-native'
import { Container, Body, Content, Header, Left, Right, Icon, Title,
  Button, Text, Card, CardItem } from 'native-base'
import Communications from 'react-native-communications'

export default class TaskExport extends React.Component {
  constructor(props){
    super(props)

    result = 'student, subject, date, duration, note \n'
    props.tasks.forEach((task) =>
      result += task.student+', '+task.subject+', '+task.date+', '
        +task.duration+' mins, "'+task.note+'"\n'
    )
    console.log(result)
    this.state = {'result': result}
  }

  static navigationOptions = ({ navigation, tasks }) => ({
    header: (
      <Header>
        <Left>
          <Button transparent iconLeft onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
            <Text>{Platform.OS === 'ios' ? 'Back':''}</Text>
          </Button>
        </Left>
        <Body>
          <Title>Export All Records</Title>
        </Body>
        <Right />
      </Header>
    )
  })

  render() {
    return (
      <Container>
        <Content>
        <Card>
          <CardItem>
            <Body>
              <Text selectable={true}>{this.state.result}</Text>
            </Body>
          </CardItem>
        </Card>
        </Content>
        <Button full onPress={() =>
          Communications.email([
            ''],null,null,
            'All Records from Time Tracker', this.state.result)}>
          <Text>Email Me</Text>
        </Button>
      </Container>
    )
  }
}
