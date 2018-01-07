import { connect } from 'react-redux'
import StudentList from './StudentList'

function mapStateToProps(state) {
  return {
    students: state.main.students,
  }
}

export default connect(mapStateToProps)(StudentList)
