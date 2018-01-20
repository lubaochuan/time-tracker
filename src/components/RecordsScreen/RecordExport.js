import React, { Component } from 'react'
import { Platform } from 'react-native'
import { Container, Body, Content, Header, Left, Right, Icon, Title,
  Button, Text, Card, CardItem } from 'native-base'
import Communications from 'react-native-communications'

export default class RecordExport extends React.Component {
  constructor(props){
    super(props)
    const { student } = props
    result = 'student, subject, date, duration, note \n'
    student.records.forEach((record) =>
      result += student.name+', '+record.subject+', '+record.date+', '
        +record.duration+' mins, "'+record.note+'"\n'
    )
    this.state = {'result': result}
  }

  static navigationOptions = ({ navigation }) => ({
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
            'All Records for '+this.props.student.name, this.state.result)}>
          <Text>Email Me</Text>
        </Button>
      </Container>
    )
  }
}
