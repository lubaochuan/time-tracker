import { connect } from 'react-redux'
import { addStudent, updateStudent, removeStudent } from '../../actions'
import StudentList from './StudentList'


function mapStateToProps(state) {
  return {
    tasks: state.main.tasks,
    students: state.main.students,
    subjects: state.main.subjects,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addStudent: payload => dispatch(addStudent(payload)),
    updateStudent: (index, payload) => dispatch(updateStudent(index, payload)),
    removeStudent: index => dispatch(removeStudent(index)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
