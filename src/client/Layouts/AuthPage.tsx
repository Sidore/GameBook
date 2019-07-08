import * as React from 'react';

export default class AuthPage extends React.Component {

    state = {
        newUser : true,
        password : "",
        nickname : "",
        email : ""
    }

    props: {
        onStatusChange
    }

    constructor(props) {
        super(props);

        this.toggleHandler = this.toggleHandler.bind(this);
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    toggleHandler(params) {
        this.setState({
            newUser: !this.state.newUser
        })
    }

    register() {
        console.log("register with creds",{
            email : this.state.email,
            password : this.state.password,
            nickname : this.state.nickname
        })
    }

    login() {
        console.log("login with creds",{
            email : this.state.email,
            password : this.state.password
        })
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }


    render() {

        let form;
        if (this.state.newUser) {
            form = <div>
                        <label>
                            Email:
                            <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
                        </label>
                        <br/>
                        <label>
                            Password:
                            <input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
                        </label>
                        <br/>
                        <label>
                            Nickname:
                            <input type="text" name="nickname" value={this.state.nickname} onChange={this.handleChange} />
                        </label>
                        <br/>
                        <button onClick={this.register}>
                            Register
                        </button>
                        
                    </div>
        } else {
            form = <div>
                        <label>
                            Email:
                            <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
                        </label> 
                        <br/>
                        <label>
                            Password:
                            <input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
                        </label>
                        <br/>
                        <button onClick={this.login}>
                            Login
                        </button>
                    </div>
        }

        return(
            <div>
                <div>New user? <br/>
                    <input type="checkbox" checked={this.state.newUser} onChange={this.toggleHandler.bind(this)}/>
                </div>
                
                {form}
            </div>
            
        );
    }

}