import React, { Component } from 'react'
import { Container, Body, Content, Header, Left, Right, Icon, Title,
  Button, Text, Card, CardItem } from 'native-base'
import Mailer from 'react-native-mail'

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
            <Text>Back</Text>
          </Button>
        </Left>
        <Body>
          <Title>Export</Title>
        </Body>
        <Right />
      </Header>
    )
  })

  handleEmail = () => {
    Mailer.mail({
      subject: 'need help',
      recipients: ['support@example.com'],
      ccRecipients: ['supportCC@example.com'],
      bccRecipients: ['supportBCC@example.com'],
      body: '<b>A Bold Body</b>',
      isHTML: true,
      attachment: {
        path: '',  // The absolute path of the file from which to read data.
        type: '',   // Mime Type: jpg, png, doc, ppt, html, pdf
        name: '',   // Optional: Custom filename for attachment
      }
    }, (error, event) => {
      Alert.alert(
        error,
        event,
        [
          {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
          {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
        ],
        { cancelable: true }
      )
    })
    this.props.navigation.goBack(null)
  }

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
        <Button full
        /*  onPress={this.handleEmail}*/
        >
          <Text>Email Me</Text>
        </Button>
      </Container>
    )
  }
}
