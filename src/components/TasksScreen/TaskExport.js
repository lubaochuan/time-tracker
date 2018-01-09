import React, { Component } from 'react'
import { Container, Body, Content, Header, Left, Right, Icon, Title,
  Button, Text } from 'native-base'
export default class TaskExport extends React.Component {
  constructor(props){
    super(props)

    result = 'student, subject, date, note \n'
    props.tasks.forEach((task) =>
      result += task.student+', '+task.subject+', '+task.date+', "'+task.note+'"\n'
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
            <Text>Back</Text>
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
          <Text selectable={true}>{this.state.result}</Text>
        </Content>
        <Button full onPress={()=>this.props.navigation.goBack(null)}>
          <Text>Close</Text>
        </Button>
      </Container>
    )
  }
}
