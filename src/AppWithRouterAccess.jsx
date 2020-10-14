import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import Home from './Home';
import SignIn from './SignIn';
import Protected from './Protected';

export default withRouter(class AppWithRouterAccess extends Component {
  constructor(props) {
    super(props);
    this.onAuthRequired = this.onAuthRequired.bind(this);
  }

  onAuthRequired() {
    this.props.history.push('/login');
  }

  render() {
    return (
      <Security issuer='https://dev-162929.okta.com/oauth2/default'
                clientId='0oa96n9rA7zUhy1Uu5d5'
                redirectUri={window.location.origin + '/login/callback'}
                onAuthRequired={this.onAuthRequired}
                pkce={true} >
        <Route path='/' exact={true} component={Home} />
        <SecureRoute path='/protected' component={Protected} />
        <Route path='/login' render={() => <SignIn issuer='https://dev-162929.okta.com/oauth2/default' />} />
        <Route path='/login/callback' component={LoginCallback} />
      </Security>
    );
  }
});
