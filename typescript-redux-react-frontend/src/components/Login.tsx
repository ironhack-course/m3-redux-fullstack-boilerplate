import React, { Component } from 'react'
import { IAction, ActionType } from '../framework/IAction';
import {IUser,IState} from '../state/appState'
import axios from 'axios';
import { reducerFunctions } from '../reducer/appReducer';

import { IWindow } from '../framework/IWindow'
declare let window: IWindow;


export interface IUserData extends IAction {
  user: IUser
}
reducerFunctions[ActionType.signup] = function (newState: IState, action: IUserData) {
    newState.UI.loggedIn = true;    
    newState.BM.user = {
        username: action.user.username,
        password: action.user.password
    };
    newState.UI.waitingForResponse=false;
    return newState;
  }

export default class Login extends Component {
    render() {
        return (
            <div>
                <h1>Login</h1>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input name="username" type="text"/>
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input name="password" type="password"/>
                </div>
                <button onClick={this.handleSubmit}>Login</button>
            </div>
        )
    }
    handleSubmit = () => {
        let username = document.getElementsByName('username')[0] as HTMLInputElement;
        let password = document.getElementsByName('password')[0] as HTMLInputElement;
        axios.post("http://localhost:8080/signup", 
        {
            username: username.value,
            password: password.value
        })
        .then(response => {
            console.log(response);
            const action: IUserData = {
                type: ActionType.signup,
                user: {
                    username: response.data.username,
                    password: response.data.password
                }
            }
            window.CS.clientAction(action);
        })
    }
}
