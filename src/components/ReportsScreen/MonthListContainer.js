import { connect } from 'react-redux'
import MonthList from './MonthList'


function mapStateToProps(state) {
  return {
    tasks: state.main.tasks,
    subjects: state.main.subjects
  }
}

export default connect(mapStateToProps)(MonthList)
