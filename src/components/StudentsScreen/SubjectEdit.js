import React, { Component } from "react"
import { Platform } from 'react-native'
import { Container, Card, CardItem, Body, Content, Header, Left, Right, Icon,
  Title, Button, Text, ListItem, Item, Input, Label, Picker, CheckBox, Form } from "native-base"
import { Field, reduxForm } from 'redux-form'

function isNormalInteger(str) {
    return /^\+?(0|[1-9]\d*)$/.test(str);
}

const validate = values => {
  const error = {};
  error.name = '';
  
  var name = values.name;
  if(values.name === undefined){
    name = '';
  }
  if(name.replace(/^\s+|\s+$/gm,'').length == 0){
    error.name = 'required';
  }
  
  return error;
};

class SubjectEdit extends Component {
  constructor(props){
    super(props)
  }

  static navigationOptions = ({ navigation, index }) => ({
    header: (
      <Header>
        <Left>
          <Button transparent iconLeft onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
            <Text>{Platform.OS === 'ios' ? 'Back':''}</Text>
          </Button>
        </Left>
        <Body>
          <Title>{index < 0? "New":"Edit"}</Title>
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
      <Item error= {hasError}>
        <Input {...input} placeholder={placeholder}
          style={{ backgroundColor: "#FFF" }}/>
      </Item>
    )
  }
  
  renderCheckbox = ({ input, label, custom }) => (
    <Item button style={{ marginBottom:20, marginTop:20 }}
      onPress={() => input.onChange(!input.value)}>
      <Left>
        <Text>{label}</Text>
      </Left>
      <Body>
        <CheckBox {...input} checked={input.value}
          onPress={() => input.onChange(!input.value)} />
      </Body>
    </Item>
  )

  render() {
    const { studentName, handleSubmit } = this.props;

    return (
      <Container>
        <Content padder>
          <Form>
          <Item>
            <Text style={{ marginBottom:20 }}>{studentName}</Text>
          </Item>
          <Field name='name'
            placeholder='Subject'
            component={this.renderInput} />
          <Field name='core' label='Core Subject' component={this.renderCheckbox} />
          </Form>
          <Button block rounded primary
            style={{ marginBottom:10, marginTop:10 }}
            onPress={handleSubmit}>
            <Text>Save</Text>
          </Button>
          <Button block rounded bordered primary
            onPress={()=>this.props.navigation.goBack(null)}>
            <Text>Cancel</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default reduxForm({
  form: 'subject',
  validate
})(SubjectEdit)
