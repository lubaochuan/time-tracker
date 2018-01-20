import { connect } from 'react-redux'
import { removeAllStudents, removeAllSubjects, removeAllRecords } from '../../actions'
import Settings from './Settings'

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    removeAllStudents: payload => dispatch(removeAllStudents()),
    removeAllSubjects: payload => dispatch(removeAllSubjects()),
    removeAllRecords: payload => dispatch(removeAllRecords()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
