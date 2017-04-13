import * as React from 'react'
import { Input } from 'valuelink/lib/tags'
import Link, { LinkAt, LinkedComponent } from 'valuelink'
import { Todo, TodoFilter, AllDoneLink, matchTodo } from './data'

interface TodoListProps {
    todosLink  : Link< Todo[] >
    filterDone : TodoFilter
}

interface TodoListState {
    editingKey : number
}

export default class TodoList extends LinkedComponent<TodoListProps, TodoListState> {
    state : TodoListState = {
        editingKey : null
    };

    render(){
        const { todosLink, filterDone } = this.props,
            editingKeyLink = this.linkAt( 'editingKey' );

        return (
            <section className="main">
                <Input className="toggle-all" id="toggle-all" type="checkbox"
                       checkedLink={ new AllDoneLink( todosLink ) }/>

                <label htmlFor="toggle-all">Mark all as complete</label>

                <ul className="todo-list">
                    { todosLink.map( todoLink => (
                        matchTodo( todoLink.value, filterDone ) ? (
                            <TodoItem key={ todoLink.key }
                                      todoLink={ todoLink }
                                      editingLink={ editingKeyLink }
                            />
                        ) : void 0
                    ) ) }
                </ul>
            </section>
        );
    }
}

function clearOnEnter( x, e ){
    if( e.keyCode === 13 ) return null;
}

interface TodoItemProps {
    todoLink : LinkAt< Todo, number >
    editingLink : Link< number >
}

const TodoItem = ( { todoLink, editingLink } : TodoItemProps ) =>{
    const editing   = editingLink.value === todoLink.key,
          todo = todoLink.value,
          className = cx( {
              'completed' : todo.done,
              'view'      : !todo.done,
              'editing'   : editing
          } );

    return (
        <li className={ className }>
            <div className="view">
                <Input className="toggle" type="checkbox"
                       checkedLink={ todoLink.at( 'done' ) }/>

                <label onDoubleClick={ editingLink.action( () => todoLink.key ) }>
                    { todo.desc }
                </label>

                <button className="destroy" onClick={ () => todoLink.remove() }/>
            </div>

            { editing &&
                <Input className="edit"
                       valueLink={ todoLink.at( 'desc' ) }
                       autoFocus={ true }
                       onBlur={ editingLink.action( () => null ) }
                       onKeyDown={ editingLink.action( clearOnEnter ) }/>
            }
        </li>
    );
};

function cx( rules : { [ className : string ] : boolean }) : string {
    const classes : string[] = [];

    for( let name in rules ){
        if( rules[ name ] ){
            classes.push( name );
        }
    }

    return classes.join( ' ' );
}
