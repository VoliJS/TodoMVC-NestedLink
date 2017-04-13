import * as React from 'react'
import Link from 'valuelink'
import { TodoFilter } from './data'

export interface FilterProps {
    count : number
    filterLink : Link<TodoFilter>
    onClear : () => void
}

const Filter = ( { count, filterLink, onClear } : FilterProps ) => (
    <footer className="footer">
		<span className="todo-count">
			<strong>{ count }</strong> item left
		</span>

        <ul className="filters">
            <li>
                <Radio checkedLink={ filterLink.equals( 'all' ) } href="#/">
                    All
                </Radio>
            </li>
            <li>
                <Radio checkedLink={ filterLink.equals( 'active' ) } href="#/active">
                    Active
                </Radio>
            </li>
            <li>
                <Radio checkedLink={ filterLink.equals( 'completed' ) } href="#/completed">
                    Completed
                </Radio>
            </li>
        </ul>

        <button className="clear-completed" onClick={ onClear }>
            Clear completed
        </button>
    </footer>
);

export default Filter;

// Radio is the decorated anchor tag linked to a boolean.
// Whenever clicked, it sets linked value to `true`
interface RadioProps extends React.HTMLProps<HTMLAnchorElement> {
    checkedLink : Link<boolean>
}

const Radio = ( { checkedLink, children, ...props } : RadioProps ) => (
    <a className={ checkedLink.value ? 'selected' : '' }
       onClick={ () => checkedLink.set( true ) } { ...props }>
        { children }
    </a>
);
