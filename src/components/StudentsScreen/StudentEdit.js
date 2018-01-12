import React, { Component } from "react"
import { Platform } from 'react-native'
import { Container, Card, CardItem, Body, Content, Header, Left, Right, Icon,
  Title, Button, Text, Item, Input, Label, Picker, Form } from "native-base"
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

class StudentEdit extends Component {
  constructor(props){
    super(props)
  }

  static navigationOptions = ({ navigation, student, id }) => ({
    header: (
      <Header>
        <Left>
          <Button transparent iconLeft onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
            <Text>{Platform.OS === 'ios' ? 'Back':''}</Text>
          </Button>
        </Left>
        <Body>
          <Title>{id < 0? "New":"Edit"}</Title>
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
          regular style={{ backgroundColor: "#FFF" }}/>
      </Item>
    )
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Container>
        <Content padder>
          <Form>
          <Field name='name'
            placeholder='Student Name'
            component={this.renderInput} />
          </Form>
          <Button block rounded primary
            style={{ marginBottom:10, marginTop:10 }}
            onPress={handleSubmit}>
            <Text>Save</Text>
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
  form: 'student',
  validate
})(StudentEdit)
