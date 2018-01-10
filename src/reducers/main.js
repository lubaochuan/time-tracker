const initialState = {
  tasks: [
{student: 'Esther Lu', subject: 'Math', date:'2017-12-03', duration:25, note: 'She practiced multiplication.'},
{student: 'Esther Lu', subject: 'Math', date:'2017-12-02', duration:30, note: 'She finished this task in the morning.'},
{student: 'Esther Lu', subject: 'Art', date:'2017-12-02', duration:30, note: 'She finished this task in the morning.'},
{student: 'Anna Lu', subject: 'Math', date:'2017-12-01', duration:30, note: 'She finished this task in the afternoon.'},
{student: 'Anna Lu', subject: 'Life Skills', date:'2017-12-01', duration:50, note: 'She learned to make pancakes.'},
{student: 'Esther Lu', subject: 'Art', date:'2017-11-01', duration:30, note: 'She painted a picture.'},
{student: 'Esther Lu', subject: 'Math', date:'2017-10-02', duration:30, note: 'She finished this task in the morning.'},
  ],
  students: [ {name:'Esther Lu'}, {name:'Anna Lu'} ],
  subjects: [
    {name: 'Math', core:true},
    {name: 'Language', core:true},
    {name: 'Art', core:false},
    {name: 'Science', core:true},
    {name: 'Life Skills', core:false}, ],
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
