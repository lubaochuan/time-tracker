const initialState = {
  students: []
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
    case 'ADD_STUDENT':
      return {
        ...state,
        students: [
          ...state.students,  /* existing students */
          {...action.payload, /* new student */
            subjects:[],      /* initialize */
            records:[],       /* initialize */
          }
        ],
      }
    case 'UPDATE_STUDENT':
      studentIndex = action.index
      newName = action.payload.name
      return {
        ...state,
        students: state.students.map((student, index) => {
        if(index === this.studentIndex){
          return {
            name: this.newName,
            subjects: student.subjects,
            records: student.records,
          }
        }else{
          return student
        }})}
    case 'REMOVE_STUDENT':
      return {
        ...state,
        students: [...state.students.slice(0, action.index),
          ...state.students.slice(action.index + 1)],}

    case 'ADD_SUBJECT':
      studentName = action.payload.student
      newSubject = action.payload.subject
      return {
        ...state,
        students: state.students.map(student => {
          if (student.name == this.studentName){
            return {...student, subjects:[...student.subjects, this.newSubject]}
          }else{
            return student
          }})}
    case 'UPDATE_SUBJECT':
      subjectIndex = action.index
      studentName = action.payload.student
      newSubject = action.payload.subject
      oldSubjectName = undefined
      return {
        ...state,
        students: state.students.map(student => {
          if (student.name == this.studentName){
            /* find and update subject name in subjects and records */
            return {
              ...student,
              subjects: student.subjects.map((subject, index) => {
                if (this.subjectIndex == index){
                  this.oldSubjectName = subject.name
                  return this.newSubject
                }else{
                  return subject
                }
              }),
              records: student.records.map(record => {
                if (record.subject == this.oldSubjectName){
                  return {...record, subject: newSubject.name}
                }else{
                  return record
                }
              })
            }
          }else{
            return student
          }})}
    case 'REMOVE_SUBJECT':
      subjectIndex = action.index
      studentName = action.payload.student
      return {
        ...state,
        students: state.students.map(student => {
          if (student.name == this.studentName){
            /* delete subject name in subjects, but not records */
            return {
              ...student,
              subjects: [
                ...student.subjects.slice(0, this.subjectIndex),
                ...student.subjects.slice(this.subjectIndex + 1)],
            }
          }else{
            return student
          }})}
    case 'ADD_RECORD':
      /* sort tasks anti-chronological latest first */
      studentName = action.payload.student
      subjectName = action.payload.subject
      newRecord = action.payload.record
      return {
        ...state,
        students: state.students.map(student => {
          if (student.name == this.studentName){
            newRecords = [newRecord, ...student.records]
            newRecords = newRecords.sort(compare)
            return {...student,
              records: newRecords}
          }else{
            return student
          }})}
    case 'UPDATE_RECORD':
      recordIndex = action.index
      studentName = action.payload.student
      newRecord = action.payload.record
      return {
        ...state,
        students: state.students.map(student => {
          if (student.name == this.studentName){
            newRecords = student.records.map((record, index) => {
              if (this.recordIndex == index){
                return this.newRecord
              }else{
                return record
              }})
            newRecords = newRecords.sort(compare)
            return { ...student, records: newRecords }
          }else{
            return student
          }})}
    case 'REMOVE_RECORD':
      recordIndex = action.index
      studentName = action.payload.student
      return {
        ...state,
        students: state.students.map(student => {
          if (student.name == this.studentName){
            return {
              ...student,
              records: [...student.records.slice(0, recordIndex),
                        ...student.records.slice(recordIndex + 1)],}
          }else{
            return student
          }})}
    case 'REMOVE_ALL_RECORDS':
      return {
        ...state,
        students: state.students.map(student => {
          return {
              ...student,
              records: [],
            }}),}
    case 'REMOVE_ALL_SUBJECTS':
      return {
        ...state,
        students: state.students.map(student => {
          return {
              ...student,
              subjects: [],
            }}),}
    case 'REMOVE_ALL_STUDENTS':
      return {
        ...state,
        students: [],}
  }
  return state
}
