import React, {
	Component,
	View,
	Text,
	Image,
	TextInput,
	Dimensions,
	TouchableHighlight,
	StyleSheet,
	ScrollView
} from 'react-native'

let width = Dimensions.get('window').width

let setName = () => {
	return { todoName: '' }
}

export default class AddName extends Component {

	constructor(props) {
		super(props)
		this.state = setName()
	}

	updateTodo(todoName) {
		this.setState({ todoName })
	}

	addTodo() {
		const { todoName } = this.state
		const { addTodo } = this.props
		if(todoName == '') return
		addTodo( todoName )
		this.setState(setName())
	}

	deleteTodo(id) {
		const { deleteTodo } = this.props
		deleteTodo(id)
	}

	todoDone(id) {
		const { todoDone } = this.props
		todoDone(id)
	}

	setFilter(filter) {
		const { setFilter } = this.props
		setFilter(filter)
	}

	render() {

		let { names, filter } = this.props
		let { todoName } = this.state

		names = getVisibleTodos(names, filter)

		let todos = names.map(n => {
			return <Todo todoDone={ () => this.todoDone(n.id) } done={n.done} key={n.id} name={n.name} id={n.id} deleteTodo={ () => this.deleteTodo(n.id) } />
		})


		return (
				<View style={ styles.todoApp }>
					<Title />
					<Tabs filter={filter} setFilter={ (filter) => this.setFilter(filter) } />
					<Input todoName={todoName} updateTodo={ (text) => this.updateTodo(text) } />
					<Button addTodo={ () => this.addTodo() } />
					<List todos={todos} />
				</View>
			)
	}
}

let Title = () => (
		<Text>React Native TODO App</Text>
)

let Input = ({ todoName, updateTodo }) => (
	<TextInput placeholder="Todo" value={ todoName } onChangeText={ updateTodo } style={ styles.input } />
)

let Button = ({ addTodo }) => (
	<TouchableHighlight style={ styles.button } onPress={ addTodo }>
		<Text style={ styles.buttonText }>Add Todo</Text>
	</TouchableHighlight>
)

let List = ({ todos }) => (
					<ScrollView style={ styles.scrollContainer }>
						{ todos }
					</ScrollView>
)

let Tabs = ({ setFilter, filter }) => (
	<View style={{ height:50, flexDirection:'row' }}>
		<Tab name="SHOW_ALL" filter={filter} setFilter={ () => setFilter('SHOW_ALL') } type="All" />
		<Tab name="SHOW_COMPLETE" filter={filter} setFilter={ () => setFilter('SHOW_COMPLETE') } type="Completed" />
		<Tab name="SHOW_INCOMPLETE" filter={filter} setFilter={ () => setFilter('SHOW_INCOMPLETE') } type="Not Completed" />
	</View>
)

let Tab = ({ type, setFilter, filter, name }) => (
	<TouchableHighlight onPress={setFilter} style={[{ justifyContent: 'center', alignItems:'center', margin:2, backgroundColor:'ededed', flex:1 }, filter == name && {backgroundColor: '666'} ]} underlayColor="transparent">
		<Text>{ type }</Text>
	</TouchableHighlight>
)

let Todo = ({ name, id, done, deleteTodo, todoDone }) => (
	<View style={ styles.todo }>
		<View style={{ flex:1, justifyContent: 'center',  }}>
			<Text style={{ fontSize:18 }}>{ name }</Text>
		</View>
		<TouchableHighlight style={[{ backgroundColor: '438eff', width:90, height:50, justifyContent: 'center', alignItems: 'center'}, done && {backgroundColor: 'green'}]} onPress={ todoDone }>
			<Text style={{ fontSize:16, color: 'white' }}>{done ? 'Complete' : 'Incomplete'}</Text>
		</TouchableHighlight>
		<TouchableHighlight style={{ backgroundColor: 'red', width:50, height:50, justifyContent: 'center', alignItems: 'center', marginLeft:2 }} onPress={ deleteTodo }>
			<Text style={{ fontSize:26, color: 'white' }}>&times;</Text>
		</TouchableHighlight>
	</View>
	)

const getVisibleTodos = (
  todos,
  filter
) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETE':
      return todos.filter(
        t => t.done
      );
    case 'SHOW_INCOMPLETE':
      return todos.filter(
        t => !t.done
      );
  }
}

var styles = StyleSheet.create({
	todoApp: {
		marginTop:60,
		flex:1
	},
	todo: {
		padding:10,
		borderTopWidth:1,
		borderTopColor: 'ededed',
		width: width,
		flexDirection: 'row',
		height:80
	},
	button: {
		marginTop:20, 
		backgroundColor: 'green', 
		width:width, 
		height:60, 
		justifyContent: 'center', 
		alignItems: 'center'
	},
	input: {
		padding:10, 
		marginTop:10, 
		height:60, 
		backgroundColor: 'ededed', 
		width:width
	},
	buttonText: {
		fontSize:18,
		color:'white',
	},
	scrollContainer: {
		flex:1, 
	}
})