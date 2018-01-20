export function addRecord(payload) {
  return {
    type: 'ADD_RECORD',
    payload,
  }
}

export function updateRecord(index, payload) {
  return {
    type: 'UPDATE_RECORD',
    index,
    payload,
  }
}

export function removeRecord(index, payload) {
  return {
    type: 'REMOVE_RECORD',
    index,
    payload,
  }
}

export function removeAllRecords() {
  return {
    type: 'REMOVE_ALL_RECORDS',
  }
}

export function addSubject(payload) {
  return {
    type: 'ADD_SUBJECT',
    payload,
  }
}

export function updateSubject(index, payload) {
  return {
    type: 'UPDATE_SUBJECT',
    index,
    payload,
  }
}

export function removeSubject(index, payload) {
  return {
    type: 'REMOVE_SUBJECT',
    index,
    payload,
  }
}

export function removeAllSubjects() {
  return {
    type: 'REMOVE_ALL_SUBJECTS',
  }
}

export function addStudent(payload) {
  return {
    type: 'ADD_STUDENT',
    payload,
  }
}

export function updateStudent(index, payload) {
  return {
    type: 'UPDATE_STUDENT',
    index,
    payload,
  }
}

export function removeStudent(index) {
  return {
    type: 'REMOVE_STUDENT',
    index,
  }
}

export function removeAllStudents() {
  return {
    type: 'REMOVE_ALL_STUDENTS',
  }
}
