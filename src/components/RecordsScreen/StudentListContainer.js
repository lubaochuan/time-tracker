import { connect } from 'react-redux'
import { addStudent, updateStudent, removeStudent } from '../../actions'
import StudentList from './StudentList'


function mapStateToProps(state) {
  return {
    students: state.main.students,
  }
}

export default connect(mapStateToProps)(StudentList)
