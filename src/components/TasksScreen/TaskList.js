import React, { Component } from 'react'
import { Container, Header, Title, Content, InputGroup, Input, List, Button,
  Body, Icon, Left, Right, Text, ListItem } from 'native-base'
import { Alert } from 'react-native'
import PropTypes from 'prop-types'

export default class TaskList extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header>
      <Left>
        <Button transparent onPress={() => navigation.navigate("DrawerOpen")}>
          <Icon name="menu" />
        </Button>
      </Left>
      <Body>
        <Title>Tasks</Title>
      </Body>
      <Right />
      </Header>
    )
  })

  static propTypes = {
    updateTask: PropTypes.func,
    removeTask: PropTypes.func,
    tasls: PropTypes.array,
  }

  render() {
    return (
      <Container>
        <Content>
          <List>
          {this.props.tasks.map((task, index) =>
          <ListItem
            onLongPress={() =>
              Alert.alert(
                'Quick Menu',
                null,
                [
                  {text: 'Edit'},
                  {text: 'Delete'},
                  {text: 'Cancel'}
                ],
                { cancelable: false }
              )}>
            <Body>
              <Text>{task.student}:{task.subject}</Text>
              <Text note>
                {task.date} {"\n"}
                {task.duration} minutes {"\n"}
                {task.note}
              </Text>
            </Body>
          </ListItem>)}
          </List>
        </Content>
      </Container>
    );
  }
}
