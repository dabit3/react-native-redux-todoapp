import * as types from './actionTypes';

export function addTodo(name) {
	return {
		type: types.ADDTODO,
		name
	}
}

export function deleteTodo(id) {
	return {
		type: types.DELETETODO,
		id
	}
}

export function todoDone(id) {
	return {
		type: types.TODODONE,
		id
	}
}

export function setFilter(filter) {
	return {
		type: types.SETFILTER,
		filter
	}
}