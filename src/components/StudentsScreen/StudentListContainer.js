import { connect } from 'react-redux'
import { addStudent, updateStudent, removeStudent } from '../../actions'
import StudentList from './StudentList'


function mapStateToProps(state) {
  return {
    tasks: state.main.tasks,
    students: state.main.students,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addStudent: payload => dispatch(addStudent(payload)),
    updateStudent: (index, payload) => dispatch(updateStudent(index, payload)),
    removeStudent: (index, payload) => dispatch(removeStudent(index, payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentList)
