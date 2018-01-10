import React, { Component } from "react"
import { Image } from "react-native";
import { Container, Content, Text, List, ListItem, Left, Icon } from "native-base"
/*const routes = ['Add Record', 'All Records', 'Reports']*/

const routes = [
  {
    name: "Add Record",
    route: "Add Record",
    icon: "add",
    bg: "#cc0000",
  },
  {
    name: "All Records",
    route: "All Records",
    icon: "list",
    bg: "#C5F442"
  },
  {
    name: "Reports",
    route: "Reports",
    icon: "albums",
    bg: "#48525D"
  },
  {
    name: "Settings",
    route: "Settings",
    icon: "settings",
    bg: "#48525D"
  },
]

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
            renderRow={data =>
            <ListItem
              button
              noBorder
              onPress={() => this.props.navigation.navigate(data.route)}>
              <Left>
                <Icon
                  active
                  name={data.icon}
                  style={{ color: "#777", fontSize: 26, width: 30 }}
                />
                <Text>
                  {data.name}
                </Text>
              </Left>
            </ListItem>}/>
        </Content>
      </Container>
    )
  }
}
