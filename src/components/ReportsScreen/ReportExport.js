import React, { Component } from 'react'
import { Container, Body, Content, Header, Left, Right, Icon, Title,
  Button, Text, Card, CardItem } from 'native-base'
import Communications from 'react-native-communications'
import { Platform } from 'react-native'

/*
[
{
  {'month':'2017-10'}
  {'subjects':[{'subject':'Math', 'total':50}, {'subject':'Art', 'total':100}]},
  {'core':50},
  {'overall':150}
},
]
*/
export default class ReportExport extends React.Component {
  constructor(props){
    super(props)

    result = 'Report for '+this.props.student.name+'\n\n'
    props.monthes.forEach((month) => {
      result += 'month: ' + month.month + '\n'
      month.subjects.forEach((subject) =>
        result += subject.subject+": "+subject.total+' hours\n'
      )
      result += 'Core Subjects: '+month.core+' hours\n'
      result += 'Other Subjects: '+month.othertotal+' hours\n\n'
    })
    console.log(result)
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
          <Title>Export</Title>
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
            'Monthly Records for '+this.props.student.name, this.state.result)}>
          <Text>Email Me</Text>
        </Button>
      </Container>
    )
  }
}
