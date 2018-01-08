import React, { Component } from "react"
import { Container, Card, CardItem, Body, Content, Header, Left, Right, Icon,
  Title, Button, Text, Item, Input, Label, Picker } from "native-base"
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
            <Text>Back</Text>
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
      <Item stackedLabel error= {hasError}>
        <Label>{label}</Label>
        <Input {...input} placeholder={placeholder}/>
        {hasError ? <Text>{error}</Text> : <Text />}
      </Item>
    )
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Container>
        <Content padder>
          <Field name='name'
            label='Name'
            placeholder='Enter name here'
            component={this.renderInput} />
          <Button block rounded primary onPress={handleSubmit}>
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
