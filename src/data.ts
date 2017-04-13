import Link from 'valuelink'

// Declare the state
export interface Todo {
    desc : string
    done : boolean
}

export type TodoFilter = "all" | "active" | "completed";

export function matchTodo( todo : Todo, filter : TodoFilter ) : boolean {
    return filter === 'all' || ( filter === 'completed' ) === todo.done;
}

export class AllDoneLink extends Link<boolean>{
    constructor( public parent : Link<Todo[]> ){
        super( parent.value.every( todo => todo.done ) );
    }

    set( x : any ) : void {
        // Perform purely functional update of the parent array.
        this.parent.update( todos =>{
            // It's okay to update it in place
            for( let todo of todos ) todo.done = Boolean( x );
            return todos;
        });
    }
}