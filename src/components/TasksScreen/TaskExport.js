import React, { Component } from 'react'
import { Container, Body, Content, Header, Left, Right, Icon, Title,
  Button, Text } from 'native-base'
import Mailer from 'react-native-mail'

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
          <Text selectable={true}>{this.state.result}</Text>
        </Content>
        <Button full
          /*onPress={this.handleEmail}*/
        >
          <Text>Email Me</Text>
        </Button>
      </Container>
    )
  }
}
