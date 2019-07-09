import * as React from 'react';
import IGameClient from "../../models/Game/IGameClient";
export default class WhosBigger extends React.Component implements IGameClient {

    send(){}

    render() {
        return (
            <div>
                WhosBigger Client
            </div>
        )
    }
}