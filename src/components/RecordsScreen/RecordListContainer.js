import { connect } from 'react-redux'
import { updateRecord, removeRecord } from '../../actions'
import RecordList from './RecordList'


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
    updateRecord: (index, payload) => dispatch(updateRecord(index, payload)),
    removeRecord: (index, payload) => dispatch(removeRecord(index, payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordList)
