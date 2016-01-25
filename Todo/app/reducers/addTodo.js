import * as types from '../actions/actionTypes'
import _ from 'lodash'

let id = 0

const initialState = {
  names: []
}

export default function addTodoReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.ADDTODO:
      id++
      return {
        ...state,
        names: [...state.names, { name: action.name, id: id } ]
      }
    case types.DELETETODO:
      return {
        ...state, 
        names:[ ...state.names.filter(n => n.id != action.id) ]
      }
    default:
      return state
  }
}
