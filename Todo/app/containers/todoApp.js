import React, {
	Component,
	View,
	Text,
	Image,
	TextInput
} from 'react-native'

import { bindActionCreators } from 'redux'
import TodoApp from '../components/todoApp'
import * as todoActions from '../actions/todoActions'
import { connect } from 'react-redux'

class TodoAppContainer extends Component {

	constructor(props) {
		super(props)
	}

	render() {
		const { state, filter, dispatch } = this.props
		return <TodoApp
						names={state.names}
						filter={filter.filter}
						{...bindActionCreators(todoActions, dispatch)} />
	}

}

function mapStateToProps(state) {
	return { state: state.addTodoReducer, filter: state.filterTodoReducer }
}

export default connect(mapStateToProps)(TodoAppContainer)
