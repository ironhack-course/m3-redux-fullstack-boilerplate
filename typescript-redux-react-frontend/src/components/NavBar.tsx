import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { IWindow } from '../framework/IWindow'
declare let window: IWindow;

const nav = ( props: any ) => {
    let render = !window.CS.getBMState().user 
    ? 
    (   
        <>
            <li><NavLink exact={true} to="/">Login</NavLink></li>
            <li><NavLink to="/register">Register</NavLink></li>
        </>
    )
    :
        <li><NavLink exact={true} to="/logout">Logout</NavLink></li>

    return (
        <nav>
            <ul>
                {render}
                <li><NavLink to="/showassets">Assets</NavLink></li>
            </ul>
        </nav>
    )
}
export default nav;