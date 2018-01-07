import { connect } from 'react-redux'
import { addSubject, updateSubject, removeSubject, addTask } from '../../actions'
import SubjectList from './SubjectList'


function mapStateToProps(state) {
  return {
    tasks: state.main.tasks,
    students: state.main.students,
    subjects: state.main.subjects,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addSubject: payload => dispatch(addSubject(payload)),
    updateSubject: (index, payload) => dispatch(updateSubject(index, payload)),
    removeSubject: index => dispatch(removeSubject(index)),
    addTask: payload => dispatch(addTask(payload)),
    updateTask: (index, payload) => dispatch(updateTask(index, payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectList)
