import React from 'react';

const ListItem = (props) => {

    return <li className="list-group-item">

        {/*update todo btn */}
        <button
            className={"btn btn-small btn-info mr-4"}
            onClick={
                ()=> {
                    props.editTodo()
                }
            }>
            <i className={"fa fa-edit"}> </i>
        </button>

        {/*set todoitem name */}
        {props.todo.name}

        {/* remove todo*/}
        <button
            className={"btn btn-small btn-danger ml-4"}
            onClick={
                ()=> {
                    props.deleteTodo()
                }
            }> X</button>

    </li>
};

export default ListItem;