import React, {
	Component,
	View,
	Text,
	Image,
	TextInput
} from 'react-native'

import { bindActionCreators } from 'redux'
import AddTodo from '../components/addTodo'
import * as todoActions from '../actions/todoActions'
import { connect } from 'react-redux'

class TodoApp extends Component {

	constructor(props) {
		super(props)
	}

	render() {
		const { state, dispatch } = this.props
		return <AddTodo
						names={state.names}
						{...bindActionCreators(todoActions, dispatch)} />
	}

}

function mapStateToProps(state) {
	return { state: state.addTodoReducer }
}

export default connect(mapStateToProps)(TodoApp)
