export function addTask(payload) {
  return {
    type: 'ADD_TASK',
    payload,
  }
}

export function updateTask(index, payload) {
  return {
    type: 'UPDATE_TASK',
    index,
    payload,
  }
}

export function removeTask(index) {
  return {
    type: 'REMOVE_TASK',
    index,
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

export function removeSubject(index) {
  return {
    type: 'REMOVE_SUBJECT',
    index,
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
