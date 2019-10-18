export interface IUser {
    firstname:string;
    lastname:string;
    username:string;
    password:string;
}

export interface IUI{
    counter: number;
    loggedIn: boolean;
    waitingForResponse:boolean;
}

export interface IAssetData {
    _id: string;
    asset_name: string;
    asset_value: number;
  }

export interface IUser {
    username: string;
    password: string;
}

export interface IBM{
<<<<<<< HEAD
    user:IUser;
    assets:IAssetData[]
=======
    assets:IAssetData[];
    user?: IUser;
>>>>>>> rebasing
}


export interface IState{
    UI:IUI;
    BM:IBM;
}

// initial state 
export const initial:IState = {
	UI: {
		counter: 0,
		loggedIn: false,
		waitingForResponse: false,
    },
	BM: {
        user:{
            firstname:"",
            lastname:"",
            username:"",
            password:""
        },
        assets:[]
	}
};
