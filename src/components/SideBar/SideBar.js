import React, { Component } from "react"
import { Image } from "react-native";
import { Container, Content, Text, List, ListItem } from "native-base"
const routes = ['Add Record', 'All Records', 'Reports']

export default class SideBar extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Image
            source={{
              uri: "https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/assets/drawer-cover.png"
            }}
            style={{
              height: 120,
              alignSelf: "stretch",
              justifyContent: "center",
              alignItems: "center"
            }}/>
          <List
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data)}>
                  <Text>{data}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    )
  }
}
