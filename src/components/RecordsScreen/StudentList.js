import React, { Component } from 'react'
import { Container, Header, Title, Content, InputGroup, Input, List, Button,
  Body, Icon, Left, Right, ListItem, Text } from 'native-base'
import PropTypes from 'prop-types'

export default class StudentList extends Component {
  constructor(props) {
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
        <Title>Records</Title>
      </Body>
      <Right />
      </Header>
    )
  })

  static propTypes = {
    students: PropTypes.array,
    tasks: PropTypes.array,
  }

  pickStudent(student) {
    this.navigate(()=>
    this.props.navigation.navigate('RecordList', {student}))
  }

  render() {
    return (
      <Container style={{backgroundColor: "#FFF"}}>
        <Content>
          <List>
            {this.props.students.map((student, index) =>
            <ListItem icon
              key={index}
              onPress={() => this.pickStudent(student)}>
              <Left>
                <Button style={{ backgroundColor: '#007AFF' }}>
                  <Icon active name='person' />
                </Button>
              </Left>
              <Body>
                <Text>{student.name}</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>)}
          </List>
        </Content>
      </Container>
    )
  }
}
