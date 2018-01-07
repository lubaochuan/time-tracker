import React, { Component } from 'react'
import { Container, Header, Title, Content, InputGroup, Input, List, Button,
  Body, Icon, Left, Right, ListItem, Text } from 'native-base'
import { Alert } from 'react-native'
import PropTypes from 'prop-types'

export default class StudentList extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header>
      <Left>
        <Button transparent onPress={() => navigation.navigate("DrawerOpen")}>
          <Icon name="menu" />
        </Button>
      </Left>
      <Body>
        <Title>Reports</Title>
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
    this.props.navigation.navigate('MonthlyList', {student})
  }

  render() {
    return (
      <Container>
        <Content>
          <List>
            {this.props.students.map((student, index) =>
            <ListItem
              key={index}
              onPress={() => this.pickStudent(student)}>
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
