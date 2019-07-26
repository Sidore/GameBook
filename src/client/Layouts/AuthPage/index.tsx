import * as React from 'react';
import "./index.styl";

export default class AuthPage extends React.Component {

    state = {
        newUser : false,
        password : "",
        nickname : "",
        email : "",
        token : ""
    }

    props: {
        onToken
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

        const creds = {
            email : this.state.email,
            password : this.state.password,
            nickname : this.state.nickname
        };

        console.log("register with creds",creds)

        let req = new XMLHttpRequest();
          req.open('POST', '/api/user'); 
          req.setRequestHeader("Content-Type", "application/json");
          req.onreadystatechange = () => {
          if (req.readyState == 4) {
                  console.log(JSON.parse(req.responseText));
                  this.setState({
                    token : JSON.parse(req.responseText).token
                })
                this.props.onToken(this.state.token);
            }
          };

          req.send(JSON.stringify(creds));
        
    }

    login() {

        const creds = {
            email : this.state.email,
            password : this.state.password
        }

        console.log("login with creds", creds)

        let req = new XMLHttpRequest();
          req.open('POST', '/api/auth'); 
          req.setRequestHeader("Content-Type", "application/json");
          req.onreadystatechange = () => {
          if (req.readyState == 4) {
                  console.log(JSON.parse(req.responseText));
                  this.setState({
                      token : JSON.parse(req.responseText).token
                  })
                  this.props.onToken(this.state.token);
            }
          };
          req.send(JSON.stringify(creds));
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
            <div className="auth-root">
                <div className="auth-root__image"></div> 
                <div className="auth-form">
                    
                    <div className="auth-form__image">

                    </div>

                    <div className="auth-form__content">
                        {form}
                        <div>New user? <br/>
                            <input type="checkbox" checked={this.state.newUser} onChange={this.toggleHandler.bind(this)}/>
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }

}