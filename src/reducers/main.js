const initialState = {
  tasks: [],
  students: [],
  subjects: [],
}

function compare(a, b) {
  if (a.date > b.date)
    return -1
  if (a.date < b.date)
    return 1
  return 0
}

export const main = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      /* add new task to front so that tasks added on the same day
         are sorted in order of addition */
      newTasks = [action.payload, ...state.tasks]
      newTasks = newTasks.sort(compare)
      return {
        ...state,
        tasks: newTasks
      }
    case 'UPDATE_TASK':
      newTasks = state.tasks.map(
        (task, index) => {
          if(action.index === index){
            return action.payload
          }else{
            return task
          }})
      newTasks = newTasks.sort(compare)
      return {
        ...state,
        tasks: newTasks
      }
    case 'REMOVE_TASK':
      return {
        ...state,
        tasks: [...state.tasks.slice(0, action.index), ...state.tasks.slice(action.index + 1)],
      }
    case 'REMOVE_ALL_TASKS':
      return {
        ...state,
        tasks: [],
      }

    case 'ADD_STUDENT':
      return { ...state,
        students: [...state.students, action.payload],
      }
    case 'UPDATE_STUDENT':
      oldname = state.students[action.index].name
      newname = action.payload.name
      return {
        ...state,
        students: state.students.map(
          (student, index) => {
            if(action.index === index){
              return action.payload
            }else{
              return student
            }
          }),
        /* propagate name change to all tasks */
        tasks: state.tasks.map(
          (task, index) => {
            if(task.student === oldname){
              return {...task, student:newname}
            }else{
              return task
            }
          }),
      }
    case 'REMOVE_STUDENT':
      return { ...state,
        students: [...state.students.slice(0, action.index),
          ...state.students.slice(action.index + 1)],
      }
    case 'REMOVE_ALL_STUDENTS':
      return {
        ...state,
        students: [],
      }

    case 'ADD_SUBJECT':
      return { ...state,
        subjects: [...state.subjects, action.payload],
      }
    case 'UPDATE_SUBJECT':
      oldname = state.subjects[action.index].name
      newname = action.payload.name
      return {
        ...state,
        subjects: state.subjects.map(
          (subject, index) => {
            if(action.index === index){
              return action.payload
            }else{
              return subject
            }
          }),
        /* propagate subject change to all tasks */
        tasks: state.tasks.map(
          (task, index) => {
            if(task.subject === oldname){
              return {...task, subject:newname}
            }else{
              return task
            }
          }),
      }
    case 'REMOVE_SUBJECT':
      return { ...state,
        subjects: [...state.subjects.slice(0, action.index),
          ...state.subjects.slice(action.index + 1)],
      }
    case 'REMOVE_ALL_SUBJECTS':
      return {
        ...state,
        subjects: [],
      }
    default:
  }
  return state
}
