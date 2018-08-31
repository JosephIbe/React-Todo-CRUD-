import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import ListItem from './components/ListItem';
import Axios from 'axios';
import loadingGIF from './loadingGIF.gif';

class App extends Component {

    constructor() {
        super();

        this.state = {
            todoItem: '',
            editing: false,
            editingIndex: null,
            notification: null,
            todos: [],
            isLoading: true
        };

        this.apiURL = 'https://5b8910a11863df001433e89f.mockapi.io';

        this.handleChange = this.handleChange.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.editTodo = this.editTodo.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
        this.generateTodoId = this.generateTodoId.bind(this);
        this.alert = this.alert.bind(this);

    }

    async componentDidMount() {
        const response = await Axios.get(`${this.apiURL}/todos`);
        console.log(response);

        if (response) {

            this.setState({
                todos: response.data,
                isLoading: false
            })

        }

    }

    render() {

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">React CRUD</h1>
                </header>
                <div className="container">
                    <h2 className={"text-center p-4"}>Todos App</h2>

                    {
                        this.state.notification &&
                        <div className="alert alert-info mt-3">
                            <p className={"text-center"}>{this.state.notification}</p>
                        </div>
                    }

                    <input type="text"
                           className={"form-control my-4"}
                           placeholder={"Add New Item"}
                           onChange={this.handleChange}
                           name={"todo"}
                           value={this.state.todoItem}/>

                    <button
                        className={"btn btn-success mb-3 form-control"}

                        onClick={this.state.editing ? this.updateTodo : this.addTodo}
                        disabled={this.state.todoItem.length < 5}>

                        {this.state.editing ? 'Update Todo' : 'Add Todos'}

                    </button>

                    {
                        this.state.isLoading &&
                        <img src={loadingGIF}/>
                    }

                    {/* only show list items when editing is false*/}

                    {
                        !this.state.editing &&
                        <ul className={"list-group"}>

                            {this.state.todos.map((todo, index) => {

                                {/* render list items */
                                }
                                return <ListItem

                                    key={todo.id}
                                    todo={todo}
                                    editTodo={() => {
                                        this.editTodo(index)
                                    }}
                                    deleteTodo={() => {
                                        this.deleteTodo(index)
                                    }}

                                />
                            })}

                        </ul>
                    }

                </div>
            </div>
        );
    }

    handleChange = (event) => {
        // console.log(event.name, event.target.value);
        this.setState({
            todoItem: event.target.value
        })
    };

    async addTodo() {

        {/*

            Old method of adding todos
            const newTodo = {
            name: this.state.todoItem,
            id: this.generateTodoId()
        };

        // this.state.todos.push(newTodo);

        const oldTodos = this.state.todos;
        oldTodos.push(newTodo);

        this.setState({
            todos: oldTodos,
            todoItem: ''
        });

        */
        }

        const response = await Axios.post(`${this.apiURL}/todos`, {name: this.state.todoItem});
        console.log(response);
        const todos = this.state.todos;
        if (response) {
            todos.push(response.data);
            this.setState({
                todos: todos,
                todoItem: ''
            });
            this.alert('Todo Item Added');
        }

    };

    async deleteTodo(index) {
        {/*
            old way before api
            console.log(index)
            const delTodos = this.state.todos;
            delete delTodos[index];

            this.setState({
                todos: delTodos
            });
        */
        }

        const todos = this.state.todos;
        const todoItem = this.state.todos[index];
        const operation = await Axios.delete(`${this.apiURL}/todos/${todoItem.id}`);
        console.log(operation);
        delete todos[index];
        if (operation) {
            this.alert('Todo Item Removed');
            this.setState({
                todos: todos
            })
        }

        // this.state.todos.splice(index, 1);
    };

    editTodo(index) {
        const newTodoItem = this.state.todos[index];

        this.setState({
            editing: true,
            todoItem: newTodoItem.name,
            editingIndex: index
        })
    }

    async updateTodo() {

        {/* Old way before api
         const newTodoItem = this.state.todos[this.state.editingIndex];
        newTodoItem.name = this.state.todoItem;

        const todos = this.state.todos;
        todos[this.state.editingIndex] = newTodoItem;

        this.setState({
            todos: todos,
            editing: false,
            editingIndex: null,
            todoItem: ''
        })

        */
        }

        const todo = this.state.todos[this.state.editingIndex];
        const update = await Axios.put(`${this.apiURL}/todos/${todo.id}`, {name: this.state.todoItem});
        console.log(update);

        const todos = this.state.todos;
        todos[this.state.editingIndex] = update.data;

        this.setState({
            todos: todos,
            editing: false,
            editingIndex: null,
            todoItem: ''
        });

        this.alert('Todo Item Updated');

    }

    generateTodoId() {
        const lastTodo = this.state.todos[this.state.todos.length - 1];
        if (lastTodo) {
            return lastTodo.id + 1;
        }
        return 1;
    }

    alert(notification) {
        this.setState({
            notification: notification
        });

        {/* Clear Notification */
        }
        setTimeout(() => {
            this.setState({
                notification: null
            })
        }, 2500);

    }
}

export default App;
