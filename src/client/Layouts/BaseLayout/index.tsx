import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store'
import { BrowserRouter as Router, Route, Link, Redirect , Switch} from "react-router-dom";
import Lobby from "../LobbyPage";
import Auth from "../AuthPage";
import Game from "../GamePage";
interface ownProps {
  }
  
  interface stateProps {
      token: string;
  }
  
  interface dispatchProps {
  }
  
  type Props = stateProps & dispatchProps & ownProps
  
  interface State {
    // token: string;
    user: any;
  }

class BaseLayout extends React.Component<Props, State>{

    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
        this.userHandler = this.userHandler.bind(this);
      }
    
      userHandler(user) {
        this.setState({
          user
        })
      }

    render () {
        return (
                  <div className="root-div">
                    <Switch>
                      <Route path="/login" render={() => (
                          this.props.token ? 
                            (<Redirect to="/"/>) :
                            (<Auth />)
                          )} 
                        />            
                      <Route path="/" exact render={() => (
                          !this.props.token ? 
                            (<Redirect to="/login"/>) : 
                            (<Lobby token={this.props.token} user={this.state.user}/>)
                          )}
                        />
                      <Route path="/rooms/:id" render={(props) => (
                          !this.props.token ?
                          (<Redirect to="/login"/>) : 
                          (<Game token={this.props.token} {...props}/>)
                        )} 
                        />
                      <Route render={() => (
                          !this.props.token ? 
                            (<Redirect to="/login"/>) : 
                            (<Lobby token={this.props.token} user={this.state.user}/>)
                          )}
                        />  
                    </Switch>
                  </div>
        );
      }
    
}

function mapStateToProps(state: AppState, ownProps: ownProps): stateProps {
    return {
        token : state.token.token
    }
  }
   
  function mapDispatchToProps(): dispatchProps {
    return {}
  }
  
  export default connect<stateProps, dispatchProps, ownProps>
  (mapStateToProps, mapDispatchToProps)(BaseLayout)