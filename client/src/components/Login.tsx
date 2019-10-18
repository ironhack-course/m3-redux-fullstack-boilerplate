import React, { Component } from 'react'
import { ActionType, IAction } from '../framework/IAction';
import { IState, IUser } from '../state/appState'
import axios from 'axios';
import { IWindow } from '../framework/IWindow';
import { reducerFunctions } from '../reducer/appReducer';
import { IUserAction } from './Register';
declare let window: IWindow;


export default class Login extends Component {
    render() {
        return (
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


}
