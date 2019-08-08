import * as React from 'react';
import "./index.styl";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { AppState } from "../../store";
import { login, IAuthResponse } from "../../store/Auth/actions";
import { ThunkDispatch } from 'redux-thunk'

const dev = location && location.hostname == "localhost" || false;
const serverUrl = dev ? "http://localhost:2503" : "";

interface ownProps {
    onToken,
    onUser
}

  interface stateProps {
    token: string
  }
       
  interface ILoginCredits {
    email: string;
    password: string;
}
  interface dispatchProps {
      login: (creds: ILoginCredits) => any
  }

  type Props = stateProps & dispatchProps & ownProps
 
interface State {
    newUser : boolean,
    password : string,
    nickname : string,
    email : string,
    token : string,
    error : string,
    message: string,
    disableSubmit: boolean
}

class AuthPage extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            newUser : false,
            password : "",
            nickname : "",
            email : "",
            token : "",
            error : "",
            message: "",
            disableSubmit: false
        }

        this.toggleHandler = this.toggleHandler.bind(this);
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    toggleHandler(params) {
        this.setState({
            newUser: !this.state.newUser,
            error : "",
            message : ""
        })
    }

    register() {

        this.setState({
            disableSubmit: true
        })

        const creds = {
            email : this.state.email,
            password : this.state.password,
            nickname : this.state.nickname
        };

        let req = new XMLHttpRequest();
          req.open('POST', `${serverUrl}/api/user`); 
          req.setRequestHeader("Content-Type", "application/json");
          req.onreadystatechange = () => {
          if (req.readyState == 4) {
            this.setState({
                disableSubmit: false
            })
                    console.log(JSON.parse(req.responseText));
                    if (req.status === 201) {
                        this.setState({
                            message : JSON.parse(req.responseText).data
                        })
                    } else if (req.status !== 200) {
                        this.setState({
                            error : JSON.parse(req.responseText).data
                        })
                    } else {
                        this.setState({
                            token : JSON.parse(req.responseText).token
                        })
                        this.props.onToken(this.state.token);
                    }
            }

            
          };

          req.send(JSON.stringify(creds));
        
    }

    async login() {

        const creds = {
            email : this.state.email,
            password : this.state.password
        }

        const res: IAuthResponse = await this.props.login(creds);

                if (res.status === 201) {
                    this.setState({
                        message : res.data
                    })
                } else if (res.status !== 200) {
                    this.setState({
                        error : res.data
                    })
                }



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
                                { (() => {
                                if (this.state.error) {
                                    return (<div className="auth-form__content__error" dangerouslySetInnerHTML={{__html: this.state.error}}>
                                    </div>)
                                } else if (this.state.message) {
                                    return (<div className="auth-form__content__message" dangerouslySetInnerHTML={{__html: this.state.message}}>
                                    </div>)
                                }
                                })()
                            }
                            <button onClick={this.register} disabled={this.state.disableSubmit} className="auth-form__content__submit">
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
                            { (() => {
                                if (this.state.error) {
                                    return (<div className="auth-form__content__error" dangerouslySetInnerHTML={{__html: this.state.error}}>
                                    </div>)
                                } else if (this.state.message) {
                                    return (<div className="auth-form__content__message" dangerouslySetInnerHTML={{__html: this.state.message}}>
                                    </div>)
                                }
                                })()
                            }
                        <button onClick={this.login} className="auth-form__content__submit" disabled={this.state.disableSubmit}>
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

    function mapStateToProps(state: AppState, ownProps: ownProps): stateProps {
        return {
            token : state.token.token
        }
      }
       
      function mapDispatchToProps(dispatch: ThunkDispatch<{}, {}, any>): dispatchProps {
        return {
            login : async ({email, password}) => {
                const res = await dispatch(login({email, password}))
                console.log('Login completed [UI]')
                return res;
              }
        }
      }
        
      export default connect<stateProps, dispatchProps, ownProps>
        (mapStateToProps, mapDispatchToProps)(AuthPage)