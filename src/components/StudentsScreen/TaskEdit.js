import React, { Component } from 'react'
import { Platform, Alert } from 'react-native'
import { Container, Card, CardItem, Body, Content, Header, Left, Right, Icon,
  Title, Button, Text, ListItem, Item, Input, Label, Picker, Form } from 'native-base'
import { Field, reduxForm } from 'redux-form'
import DatePicker from 'react-native-datepicker'
import moment from 'moment'

function isNormalInteger(str) {
    return /^\+?(0|[1-9]\d*)$/.test(str)
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
            <Text>{Platform.OS === 'ios' ? 'Back':''}</Text>
          </Button>
        </Left>
        <Body>
          <Title>{edit?'Edit':'New'}</Title>
        </Body>
        <Right />
      </Header>
    )
  })

  renderInput = ({ input, label, placeholder, type, meta: { touched, error, warning } })=>{
    return(
      <Item>
        <Input {...input} placeholder={placeholder}
          regular
          style={{ backgroundColor: "#FFF" }}/>
      </Item>
    )
  }

  renderPicker = ({ input: { onChange, value, ...inputProps },
    label, children,  ...pickerProps }) => (
    <Item>
      <Left>
      <Picker
        regular
        placeholder="Select One"
        selectedValue={ value }
        onValueChange={ value => onChange(value) }
        style={{ backgroundColor: "#FFF" }}
        style={{ width:(Platform.OS === 'ios') ? undefined : 200 }}
        { ...inputProps }
        { ...pickerProps }
      >
        { children }
      </Picker>
      </Left>
    </Item>
  )
  
  renderDatePicker = ({ input: { onChange, value, ...inputProps } }) => (
    <Item>
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
  )
  
  trySubmit = (values) => {
    if(!isNormalInteger(values.duration)){
      Alert.alert(
        'Duration must be a number.',
        null,
        [
          {text: 'Cancel'}
        ],
        { cancelable: false }
      )
    }else{
      this.props.handleSubmit()
    }
  }

  render() {
    const { handleSubmit, students, subjects } = this.props;

    return (
      <Container>
        <Content padder>
          <Form>
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
            placeholder="Enter duration in minutes"
            component={this.renderInput} />
          <Field name="note"
            label="Note"
            placeholder="Enter note here"
            component={this.renderInput} />
          </Form>
          <Button block rounded primary
            style={{ marginBottom:10, marginTop:10 }}
            onPress={handleSubmit(this.trySubmit)}>
            <Text>Save Record</Text>
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
  /*validate*/
})(TaskEdit)
