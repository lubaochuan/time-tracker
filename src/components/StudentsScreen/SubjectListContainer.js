import { connect } from 'react-redux'
import { addSubject, updateSubject, removeSubject, addRecord } from '../../actions'
import SubjectList from './SubjectList'


function mapStateToProps(state, props) {
  currentStudent = state.main.students.find(student => {
    return student.name == props.student.name
  })
  return {
    student: currentStudent,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addSubject: payload => dispatch(addSubject(payload)),
    updateSubject: (index, payload) => dispatch(updateSubject(index, payload)),
    removeSubject: (index, payload) => dispatch(removeSubject(index, payload)),
    addRecord: payload => dispatch(addRecord(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectList)
