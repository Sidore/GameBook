import * as React from 'react';

export default class HallLayout extends React.Component {

    state = {
        newUser : false
    }

    toggleHandler(params) {
        this.setState({
            newUser: !this.state.newUser
        })
    }

    render() {

        let form;

        if (this.state.newUser) {
            form = <div>
                        login form
                    </div>
        } else {
            form = <div>
                        reg form
                    </div>
        }

        return(
            <div>
                <div>form type toggle <br/>
                    <input type="checkbox" onChange={this.toggleHandler.bind(this)}/>
                </div>
                
                {form}
            </div>
            
        );
    }

}