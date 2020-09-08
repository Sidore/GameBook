import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store'
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import Lobby from "../LobbyPage";
import Auth from "../AuthPage";
import Game from "../GamePage";
import Admin from "../AdminPage";
import { ThunkDispatch } from 'redux-thunk';
import { tryToLogin } from '../../store/Auth/actions';

interface ownProps {
}

interface stateProps {
  token: string;
  
}

interface dispatchProps {
  tryToLogin: () => any
}

type Props = stateProps & dispatchProps & ownProps

interface State {
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

  componentDidMount() {
    this.props.tryToLogin();
  }

  render() {
    return (
      <div className="root-div">
        <Switch>
          <Route path="/login" render={() => (
            this.props.token ?
              (<Redirect to="/" />) :
              (<Auth />)
          )}
          />
          <Route path="/admin" render={() => (
            !this.props.token ?
              (<Redirect to="/login" />) :
              (<Admin />)
          )}
          />
          <Route path="/" exact render={() => (
            !this.props.token ?
              (<Redirect to="/login" />) :
              (<Lobby />)
          )}
          />
          <Route path="/rooms/:id" render={(props) => (
            !this.props.token ?
              (<Redirect to="/login" />) :
              (<Game token={this.props.token} {...props} />)
          )}
          />
          <Route render={() => (
            !this.props.token ?
              (<Redirect to="/login" />) :
              (<Lobby />)
          )}
          />
        </Switch>
      </div>
    );
  }

}

function mapStateToProps(state: AppState, ownProps: ownProps): stateProps {
  return {
    token: state.token.token
  }
}

function mapDispatchToProps(dispatch: ThunkDispatch<{}, {}, any>): dispatchProps {
  return {
    tryToLogin: async () => {
          const res = await dispatch(tryToLogin())
          console.log('Login completed from token [UI]')
          return res;
      }
  }
}

export default connect<stateProps, dispatchProps, ownProps>
  (mapStateToProps, mapDispatchToProps)(BaseLayout)