const initialState = {
  tasks: [
    {student: 'Esther Lu', subject: 'Math', date:'2017-12-01', duration:'30',
      note: 'She finished this task in the morning.'},
    {student: 'Esther Lu', subject: 'Math', date:'2017-12-02', duration:'25',
        note: 'She practiced multiplication.'},
    {student: 'Esther Lu', subject: 'Art', date:'2017-11-01', duration:'30',
      note: 'She painted a picture.'},
    {student: 'Anna Lu', subject: 'Math', date:'2017-12-01', duration:'30',
      note: 'She finished this task in the afternoon.'},
    {student: 'Anna Lu', subject: 'Life Skills', date:'2017-12-01', duration:'50',
        note: 'She learned to make pancakes.'}, ],
  students: ['Esther Lu', 'Anna Lu'],
  subjects: [
    {title: 'Math', core:true},
    {title: 'Language', core:true},
    {title: 'Art', core:false},
    {title: 'Science', core:true},
    {title: 'Life Skills', core:false}, ],
}

export const main = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state,
        tasks: [...state.tasks, action.payload],
      }
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(
          (task, index) => {
            if(action.index === index){
              return action.payload
            }else{
              return task
            }
          })
      }
    case 'REMOVE_TASK':
      return {
        ...state,
        tasks: [...state.tasks.slice(0, action.index), ...state.tasks.slice(action.index + 1)],
      }

    case 'ADD_STUDENT':
      return { ...state,
        students: [...state.students, action.payload],
      }
    case 'UPDATE_STUDENT':
      return {
        ...state,
        students: state.subjects.map(
          (student, index) => {
            if(action.index === index){
              return action.payload
            }else{
              return student
            }
          }),
      }
    case 'REMOVE_STUDENT':
      return { ...state,
        students: [...state.students.slice(0, action.index),
          ...state.students.slice(action.index + 1)],
      }

    case 'ADD_SUBJECT':
      return { ...state,
        subjects: [...state.subjects, action.payload],
      }
    case 'UPDATE_SUBJECT':
      return {
        ...state,
        subjects: state.subjects.map(
          (subject, index) => {
            if(action.index === index){
              return action.payload
            }else{
              return subject
            }
          })
      }
    case 'REMOVE_SUBJECT':
      return { ...state,
        subjects: [...state.subjects.slice(0, action.index),
          ...state.subjects.slice(action.index + 1)],
      }
    default:
  }
  return state
}
