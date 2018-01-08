import React, { Component } from "react"
import { Container, Card, CardItem, Body, Content, Header, Left, Right, Icon,
  Title, Button, Text, ListItem, Item, Input, Label, Picker } from "native-base"
import { Field, reduxForm } from 'redux-form'
import DatePicker from 'react-native-datepicker'
import moment from 'moment'

function isNormalInteger(str) {
    return /^\+?(0|[1-9]\d*)$/.test(str)
}

const validate = values => {
  const error = {};
  
  var duration = values.duration
  if(values.duration === undefined){
    duration = ''
  }

  if(!isNormalInteger(duration)){
    /* error.duration = 'must be integer' */
    error.duration = ' '
  }
  
  return error
}

class TaskEdit extends React.Component {
  constructor(props){
    super(props)
  }

  static navigationOptions = ({ navigation, edit }) => ({
    header: (
      <Header>
        <Left>
          <Button transparent iconLeft onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
            <Text>Back</Text>
          </Button>
        </Left>
        <Body>
          <Title>{edit?'Edit':'New'}</Title>
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

  renderPicker = ({ input: { onChange, value, ...inputProps },
    label, children,  ...pickerProps }) => (
    <Item stackedLabel>
      <Label>{label}</Label>
    <Picker
      placeholder="Select One"
      selectedValue={ value }
      onValueChange={ value => onChange(value) }
      { ...inputProps }
      { ...pickerProps }
    >
      { children }
    </Picker>
    </Item>
  )
  
  renderDatePicker = ({ input: { onChange, value, ...inputProps } }) => (
    <Item stackedLabel>
      <Label>Date</Label>
      <DatePicker
        date={value}
        format={"YYYY-MM-DD"}
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={(date) => onChange(date)}/>
    </Item>
  );

  render() {
    const { handleSubmit, students, subjects } = this.props;

    return (
      <Container>
        <Content padder>
          <Field
            name="student"
            label="Student"
            component={ this.renderPicker }
            iosHeader="Select one"
            mode="dropdown">
            {students.map((student, index) =>
              <Item label={student} value={student} key={index}/>)}
          </Field>
          <Field
            name="subject"
            label="Subject"
            component={ this.renderPicker }
            iosHeader="Select one"
            mode="dropdown">
            {subjects.map((subject, index) =>
              <Item label={subject} value={subject} key={index}/>)}
          </Field>
          <Field name="date" component={this.renderDatePicker}/>
          <Field name="duration"
            label="Duration (minutes)"
            placeholder="Enter duration here"
            parse={value => Number(value)}
            component={this.renderInput} />
          <Field name="note"
            label="Note"
            placeholder="Enter note here"
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
  form: 'test',
  validate
})(TaskEdit)
