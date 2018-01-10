import { connect } from 'react-redux'
import { removeAllStudents, removeAllSubjects, removeAllTasks } from '../../actions'
import Settings from './Settings'

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    removeAllStudents: payload => dispatch(removeAllStudents()),
    removeAllSubjects: payload => dispatch(removeAllSubjects()),
    removeAllTasks: payload => dispatch(removeAllTasks()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
