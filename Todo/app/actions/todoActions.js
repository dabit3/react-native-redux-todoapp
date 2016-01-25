import * as types from './actionTypes';

export function addTodo(name) {
	return {
		type: types.ADDTODO,
		name: name
	}
}

export function deleteTodo(id) {
	return {
		type: types.DELETETODO,
		id: id
	}
}