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
            form = <div className="auth-form__content">
                        <div className="auth-form__content-reg">
                            <h1 className="auth-form__content__header">Sign Up</h1>
                        
                                <input type="text" className="auth-form__content__input" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email"/>
        
                                <input type="text" className="auth-form__content__input" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password"/>
            
                                <input type="text" className="auth-form__content__input" name="nickname" value={this.state.nickname} onChange={this.handleChange} placeholder="Nickname"/>
                    
                            <button onClick={this.register} className="auth-form__content__submit">
                                Register
                            </button>
                        </div>
                        <div className="auth-form__content-change">
                            Already have account? <span className="auth-form__content-change__button" onClick={this.toggleHandler.bind(this)}>Sing in</span>
                        </div>
                    </div>
        } else {
            form = <div className="auth-form__content">
                    <div className="auth-form__content-login">
                        <h1 className="auth-form__content__header">Sign In</h1>
                            <input className="auth-form__content__input" type="text" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email"/>
                            <input className="auth-form__content__input" type="text" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password"/>
                        <button onClick={this.login} className="auth-form__content__submit" >
                            Login
                        </button>
                    </div>
                    <div className="auth-form__content-change">
                        New palyer? <span className="auth-form__content-change__button" onClick={this.toggleHandler.bind(this)}>Sing Up</span>
                    </div>
                </div>
        }

        return(
            <div className="auth-root">
                <div className="auth-root__image"></div> 
                <div className="auth-form">
                    
                    <div className="auth-form__image">

                    </div>

                    
                        {form}
                        
                    </div>
                    
                </div>
        );
    }

}