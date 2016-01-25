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

	render() {

		let { names } = this.props
		let { todoName } = this.state
		
		let todos = names.map(n => {
			return <Todo key={n.id} name={n.name} id={n.id} deleteTodo={ () => this.deleteTodo(n.id) } />
		})

		return (
				<View style={ styles.todoApp }>
					<Title />
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

let Todo = ({ name, id, deleteTodo }) => (
	<View style={ styles.todo }>
		<View style={{ flex:1, justifyContent: 'center',  }}>
			<Text style={{ fontSize:18 }}>{ name } - { id }</Text>
		</View>
		<TouchableHighlight style={{ backgroundColor: 'red', width:60, height:60, justifyContent: 'center', alignItems: 'center' }} onPress={ deleteTodo }>
			<Text style={{ fontSize:26 }}>&times;</Text>
		</TouchableHighlight>
	</View>
	)

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
		backgroundColor: '#ddd', 
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
		fontSize:18
	},
	scrollContainer: {
		flex:1, 
	}
})