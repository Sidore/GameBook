import * as React from 'react';

export default class HallLayout extends React.Component {

    state = {
        newUser : false
    }

    props: {
        onStatusChange
    }


    toggleHandler(params) {
        this.setState({
            newUser: !this.state.newUser
        })
    }

    reg() {
        this.props.onStatusChange = {
            email : "lol"
        }

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
                        <button onClick={this.reg.bind(this)}>
                            reg
                            </button>
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