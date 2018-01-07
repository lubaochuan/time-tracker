import { connect } from 'react-redux'
import { updateTask, removeTask } from '../../actions'
import TaskList from './TaskList'


function mapStateToProps(state) {
  return {
    tasks: state.main.tasks,
    students: state.main.students,
    subjects: state.main.subjects,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateTask: (index, payload) => dispatch(updateTask(index, payload)),
    removeTask: index => dispatch(removeTask(index)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
