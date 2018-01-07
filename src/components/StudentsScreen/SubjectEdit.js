import React, { Component } from "react"
import { Container, Card, CardItem, Body, Content, Header, Left, Right, Icon,
  Title, Button, Text, ListItem, Item, Input, Label, Picker, CheckBox } from "native-base"
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

  static navigationOptions = ({ navigation, subject, index }) => ({
    header: (
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
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
      <ListItem stackedLabel error= {hasError}>
        <Label>{label}</Label>
        <Input {...input} placeholder={placeholder}/>
        {hasError ? <Text>{error}</Text> : <Text />}
      </ListItem>
    )
  }
  
  renderCheckbox = ({ input, label, custom }) => (
    <ListItem fixedLabel>
      <CheckBox {...input} checked={input.value ? true : false}
        onPress={() => input.onChange(!input.value)} />
      <Body>
        <Text>{label}</Text>
      </Body>
    </ListItem>
  )

  render() {
    const { handleSubmit } = this.props;

    return (
      <Container>
        <Content padder>
          <Field name="name" label="Subject:" placeholder="Enter subject name" component={this.renderInput} />
          <Field name="core" label="Core Subject" component={this.renderCheckbox} />
          <ListItem>
          <Button block rounded primary onPress={handleSubmit}>
            <Text>Save</Text>
          </Button>
          <Button block rounded bordered primary onPress={()=>this.props.navigation.goBack(null)}>
            <Text>Cancel</Text>
          </Button>
          </ListItem>
        </Content>
      </Container>
    );
  }
}

export default reduxForm({
  form: 'subject',
  validate
})(SubjectEdit)
