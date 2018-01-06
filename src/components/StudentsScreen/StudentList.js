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
        <Title>Students</Title>
      </Body>
      <Right />
      </Header>
    )
  })

  static propTypes = {
    addStudent: PropTypes.func,
    updateStudent: PropTypes.func,
    removeStudent: PropTypes.func,
    students: PropTypes.array,
  }

  render() {
    return (
      <Container>
        <Content>
          <List>
            {this.props.students.map((item, index) =>
              <ListItem>
                <Text>{item}</Text>
              </ListItem>)}
          </List>
        </Content>

        <Button block>
          <Text>Add New Student</Text>
        </Button>
      </Container>
    )
  }
}
