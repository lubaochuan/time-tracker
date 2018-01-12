import React, { Component } from 'react'
import { Container, Header, Title, Content, InputGroup, Input, List, Button,
  Body, Icon, Left, Right, Text, ListItem, Card, CardItem } from 'native-base'
import PropTypes from 'prop-types'
import { Platform } from 'react-native'

Array.prototype.groupBy = function(prop) {
  return this.reduce(function(groups, item) {
    var val = item[prop]
    groups[val] = groups[val] || [];
    groups[val].push(item)
    return groups
  }, {})
}

function minutesToHours(minutes) {
  return (minutes/60).toFixed(1)
}

monthNames = ["", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"]

function getMonthName(num) {
  return monthNames[parseInt(num)];
}

export default class MonthlyList extends Component {
  static navigationOptions = ({ navigation, student }) => ({
    header: (
      <Header>
        <Left>
          <Button transparent iconLeft onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
            <Text>{Platform.OS === 'ios' ? 'Back':''}</Text>
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
        duration: Number(task.duration)
      }
      return obj
    })

    monthes = tasks.groupBy('month')
    all = []
    Object.keys(monthes).forEach(month => {
        eachmonth = monthes[month]
        subjects = eachmonth.groupBy('subject')
        core = 0
        monthTotal = 0
        subs = []
        Object.keys(subjects).forEach(subject => {
          total = subjects[subject].reduce((a, b) => a+b.duration, 0)
          subs.push({'subject':subject, 'total':minutesToHours(total)})
          monthTotal += total
          if (cores.indexOf(subject) > -1){
            core += total
          }
        })
        all.push({'month':month,
                  'subjects':subs,
                  'core':minutesToHours(core),
                  'othertotal':minutesToHours(monthTotal-core),})
    })
    console.log(JSON.stringify(all))
    this.state = {
      monthes: all,
      isNavigating: false,
    }
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

  exportReport(monthes) {
    console.log("to exort")
    this.navigate(()=>
      this.props.navigation.navigate('ReportExport', {student:this.props.student, monthes}))
  }

  render() {
    return (
      <Container>
        <Content>
        {this.state.monthes.map((item, index) =>
        <Card key={index}>
          <CardItem header>
            <Text>{getMonthName(item.month.substring(5, 7))} / {item.month.substring(0, 4)}</Text>
          </CardItem>
          <CardItem>
            <Body>
              {item.subjects.map((item, index) =>
              <Text key={index}>
                {item.subject}: {item.total} hrs
              </Text>)}
              <Text> </Text>
              <Text>Core Subjects: {item.core} hrs</Text>
              <Text>Other Subjects: {item.othertotal} hrs</Text>
            </Body>
          </CardItem>
        </Card>)}
        </Content>
        <Button full onPress={() => this.exportReport(this.state.monthes)}>
          <Text>Export Report</Text>
        </Button>
      </Container>
    )
  }
}
