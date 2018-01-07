import { connect } from 'react-redux'
import MonthlyList from './MonthlyList'


function mapStateToProps(state) {
  return {
    tasks: state.main.tasks,
    students: state.main.students,
    subjects: state.main.subjects
  }
}

export default connect(mapStateToProps)(MonthlyList)
