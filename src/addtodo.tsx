import * as React from 'react'
import { LinkedComponent } from 'valuelink'
import { Input } from 'valuelink/lib/tags'

interface Props {
    onEnter : ( desc : string ) => void
}

interface State {
    desc : string
}

export default class AddTodo extends LinkedComponent<Props, State>{
    state : State = {
        desc : ''
    };

    render(){
        return (
            <header className="header">
                <h1>todos</h1>

                <Input className="new-todo" placeholder="What needs to be done?" autoFocus={ true }
                       valueLink={ this.linkAt( 'desc' ) }
                       onKeyDown={ this.onKeyDown }
                />
            </header>
        );
    }

    onKeyDown = ({ keyCode }) => {
        if( keyCode === 13 ){
            const { state, props } = this;

            state.desc && props.onEnter( state.desc );
            this.links.desc.set( "" );
        }
    }
}
