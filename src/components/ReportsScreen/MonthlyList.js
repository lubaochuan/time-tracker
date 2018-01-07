import React, { Component } from 'react'
import { Container, Header, Title, Content, InputGroup, Input, List, Button,
  Body, Icon, Left, Right, Text, ListItem, Card, CardItem } from 'native-base'
import { Alert } from 'react-native'
import PropTypes from 'prop-types'

Array.prototype.groupBy = function(prop) {
  return this.reduce(function(groups, item) {
    var val = item[prop]
    groups[val] = groups[val] || [];
    groups[val].push(item)
    return groups
  }, {})
}

function minutesToHours(minutes){
  return (minutes/60).toFixed(1)
}

export default class MonthlyList extends Component {
  static navigationOptions = ({ navigation, student }) => ({
    header: (
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>{student.name}</Title>
        </Body>
        <Right />
      </Header>
    )
  })

  constructor(props){
    super(props)

    cores = this.props.subjects.filter(subject => subject.core)
    cores = cores.map(item => item.name)

    student = this.props.student.name
    tasks = this.props.tasks.filter(task => task.student == student)
    tasks = tasks.map(task => {
      obj =
      {
        subject: task.subject,
        month: task.date.substring(0, 7), // keep 2017-12
        duration: task.duration
      }
      return obj
    })

    monthes = tasks.groupBy('month')
    all = []
    Object.keys(monthes).forEach(month => {
        eachmonth = monthes[month]
        subjects = eachmonth.groupBy('subject')
        core = 0
        subs = []
        Object.keys(subjects).forEach(subject => {
          total = subjects[subject].reduce((a, b) => a+b.duration, 0)
          subs.push({'subject':subject, 'total':total})
          if (cores.indexOf(subject) > -1){
            core += total
          }
        })
        subs.push({'subject':'core', 'total':core})
        all.push({'month':month, 'subjects':subs})
    })
    console.log(JSON.stringify(all))
    this.state = {monthes: all}
  }

  static propTypes = {
    updateTask: PropTypes.func,
    removeTask: PropTypes.func,
    tasks: PropTypes.array,
    subjects: PropTypes.array,
  }

  renderSubject(subject, total) {
    return (
      <Text>
        subject}:{total} hours
      </Text>)
  }

  render() {
    return (
      <Container>
        <Content>
        {this.state.monthes.map((item, index) =>
        <Card key={index}>
          <CardItem header>
            <Text>{item.month}</Text>
          </CardItem>
          <CardItem>
            <Body>
              {item.subjects.map((item, index) =>
              <Text key={index}>
                {item.subject}: {minutesToHours(item.total)} hrs
                ({item.total} mins)
              </Text>)}
            </Body>
          </CardItem>
        </Card>)}
        </Content>
      </Container>
    )
  }
}