import { TokenState, TokenActionTypes, SET_TOKEN, REMOVE_TOKEN } from "./types";

import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { resetCaches } from "graphql-tag";

const dev = location && location.hostname == "localhost" || false;
const serverUrl = dev ? "http://localhost:2503" : "";


function setToken(token: string): TokenActionTypes {
    return {
        type: SET_TOKEN,
        payload: token
    }
}

function removeToken(): TokenActionTypes {
    return {
        type: REMOVE_TOKEN
    }
}

interface ILoginCredits {
    email: string;
    password: string;
}

export interface IAuthResponse {
    status: number;
    data?: string;
    token?: string;
    type?: string;
    error?: string
}

export const login = (creds: ILoginCredits): ThunkAction<Promise<IAuthResponse>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<IAuthResponse> => {
        return new Promise<IAuthResponse>(async (resolve) => {
            console.log("login with creds", creds)
            let status: number;
            const response = await fetch(`${serverUrl}/api/auth`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(creds),
            })
                .then(res => {
                    status = res.status;
                    return res.json()
                })
                .then(res => {
                    res.status = status;
                    if (res.token) {
                        dispatch(setToken(res.token));
                    }
                    resolve(res);
                })

        })
    }

}

// console.log("login with creds", creds)

//         let req = new XMLHttpRequest();
//           req.open('POST', `${serverUrl}/api/auth`); 
//           req.setRequestHeader("Content-Type", "application/json");
//           req.onreadystatechange = () => {
//           if (req.readyState == 4) {
//             this.setState({
//                 disableSubmit: false
//             })
//                   console.log(JSON.parse(req.responseText));
//                   if (req.status === 201) {
//                     this.setState({
//                         message : JSON.parse(req.responseText).data
//                     })
//                 } else if (req.status !== 200) {
//                     this.setState({
//                         error : JSON.parse(req.responseText).data
//                     })
//                 } else {
//                   this.setState({
//                       token : JSON.parse(req.responseText).token
//                   })
//                   this.props.onToken(this.state.token);
//                   this.props.onUser(JSON.parse(req.responseText).user)
//                 }
//             }

//           };
//           req.send(JSON.stringify(creds));