import React, { Component } from 'react'
<<<<<<< HEAD
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
=======
import { ActionType, IAction } from '../framework/IAction';
import { IState, IUser } from '../state/appState'
import axios from 'axios';
import { IWindow } from '../framework/IWindow';
import { reducerFunctions } from '../reducer/appReducer';
import { IUserAction } from './Register';
declare let window: IWindow;

>>>>>>> a2718c9

export default class Login extends Component {
    render() {
        return (
<<<<<<< HEAD
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
=======
            <form onSubmit={this.handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input type="username" placeholder="Your username" onChange={this.handleUsernameChange} value={window.CS.getBMState().user.username} />
            <br />
            <label htmlFor="password">Password:</label>
            <input type="password" placeholder="********" onChange={this.handlePasswordChange} value={window.CS.getBMState().user.password} />
            <br />
            <input type="submit" value="Login" />
        </form>

        )
    }

    handleUsernameChange(event: any) {
        let user = window.CS.getBMState().user;
        user.username = event.target.value
        const action: IUserAction = {
            type: ActionType.update_user,
            user: user
        }
        window.CS.clientAction(action);
    }
    handlePasswordChange(event: any) {
        let user = window.CS.getBMState().user;
        user.password = event.target.value
        const action: IUserAction = {
            type: ActionType.update_user,
            user: user
        }
        window.CS.clientAction(action);
    }

    handleSubmit(event: any) {
        event.preventDefault();
        const uiAction: IAction = {
            type: ActionType.server_called
        }
        window.CS.clientAction(uiAction);
        axios.post(window.CS.getDBServerURL() + '/signup', window.CS.getBMState().user)
            .then(res => {
                const uiAction: IAction = {
                    type: ActionType.user_created
                }
                window.CS.clientAction(uiAction);

                console.log(res.data)
            });
    }


>>>>>>> a2718c9
}
