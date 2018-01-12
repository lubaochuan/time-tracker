import React, { Component } from "react"
import { Platform } from 'react-native'
import { Container, Card, CardItem, Body, Content, Header, Left, Right, Icon,
  Title, Button, Text, ListItem, Item, Input, Label } from "native-base"
import { Field, reduxForm } from 'redux-form'

class DeleteConfirm extends Component {
  constructor(props){
    super(props)
    this.state = {
      active: false,
    }
  }

  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header
        style={{ backgroundColor: "#dc4239" }}
        androidStatusBarColor="#dc2015"
        iosBarStyle="light-content">
        <Left>
          <Button transparent iconLeft onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
            <Text>{Platform.OS === 'ios' ? 'Back':''}</Text>
          </Button>
        </Left>
        <Body>
          <Title>Are you sure?</Title>
        </Body>
        <Right />
      </Header>
    )
  });

  renderInput = ({ input, label, placeholder, type, meta: { touched, error, warning } })=>{
    var hasError= false;
    if(error !== undefined){
      hasError= true;
    }
    return(
      <Item fixedLabel error= {hasError}>
        <Label>{label}</Label>
        <Input {...input} placeholder={placeholder}
          style={{ backgroundColor: "#FFF" }}
          onChangeText={(text)=>{
            if(text == this.props.title){
              this.setState({active: true})
            }
          }}/>
      </Item>
    )
  }

  render() {
    const { title, handleSubmit } = this.props;

    return (
      <Container>
        <Content padder>
          <Field name='confirm'
            label={'Enter "'+title+'" to confirm'}
            placeholder='Enter confirm text'
            component={this.renderInput} />
          <Button iconLeft block rounded primary danger disabled={!this.state.active}
            onPress={handleSubmit}>
            <Icon active name="trash" />
            <Text>Trash</Text>
          </Button>
          <Button block rounded bordered primary onPress={()=>this.props.navigation.goBack(null)}>
            <Text>Cancel</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default reduxForm({
  form: 'confirm',
})(DeleteConfirm)
