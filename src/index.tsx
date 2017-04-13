import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { LinkedComponent } from 'valuelink'
import TodoList from './todolist'
import Filter from './filter'
import AddTodo from './addtodo'
import { Todo, TodoFilter } from './data'

export interface AppState {
    todos : Todo[],
    filterDone : TodoFilter
} 

class App extends LinkedComponent< undefined, AppState>{
    // An application state is stored as the top-level component state.
    state : AppState = {
        todos : [],
        filterDone : null
    };

    getActiveCount() : number {
        return this.state.todos.reduce( ( count, todo ) => todo.done ? count : count + 1, 0 );
    }

    addTodo = ( desc : string ) : void => {
        this.links.todos.push({ done : false, desc : desc });
    };

    removeDone = () : void => {
        this.links.todos.update( x => x.filter( todo => !todo.done ) );
    };

    componentWillMount(){
        const json = JSON.parse( localStorage.getItem( 'todo-mvc' ) || "{}" );

        // initialize state with raw JSON
        this.setState( json );

        window.onunload = () =>{
            // Save state back to the local storage
            localStorage.setItem( 'todo-mvc', JSON.stringify( this.state ) );
        }
    }

    render(){
        const links = this.linkAll(),
            { todos, filterDone } = this.state,
            hasTodos = Boolean( todos.length );

        return (
            <div>
                <section className="todoapp">
                    <AddTodo onEnter={ this.addTodo }/>

                    { hasTodos &&
                        <TodoList todosLink={ links.todos }
                                  filterDone={ filterDone }
                        />
                    }

                    { hasTodos &&
                        <Filter count={ this.getActiveCount() }
                                filterLink={ links.filterDone }
                                onClear={ this.removeDone }
                        />
                    }
                </section>

                <footer className="info">
                    <p>Double-click to edit a todo</p>
                    <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
                    <p>Created by <a href="http://todomvc.com">Vlad Balin</a></p>
                    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
                </footer>
                </div>
            );
    }
}

ReactDOM.render( <App />, document.getElementById( 'app-mount-root' ) );

