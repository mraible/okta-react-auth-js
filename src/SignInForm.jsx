import React, { Component } from 'react';
import { OktaAuth } from '@okta/okta-auth-js';
import { withOktaAuth } from '@okta/okta-react';

export default withOktaAuth(class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionToken: null,
      username: '',
      password: ''
    };

    this.oktaAuth = new OktaAuth({
      // If your app is configured to use the Implicit Flow
      // instead of the Authorization Code with Proof of Code Key Exchange (PKCE)
      // you will need to uncomment the below line:
      // pkce: false,
      issuer: props.issuer
    });

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.oktaAuth.signIn({
      username: this.state.username,
      password: this.state.password
    })
      .then(res => {
        const sessionToken = res.sessionToken;
        this.setState(
          { sessionToken },
          // sessionToken is a one-use token, so make sure this is only called once
          () => this.props.authService.redirect({sessionToken})
        );
      })
      .catch(err => console.log('Found an error', err));
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  render() {
    if (this.state.sessionToken) {
      // Hide form while sessionToken is converted into id/access tokens
      return null;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input
            id="username" type="text"
            value={this.state.username}
            onChange={this.handleUsernameChange} />
        </label>
        <label>
          Password:
          <input
            id="password" type="password"
            value={this.state.password}
            onChange={this.handlePasswordChange} />
        </label>
        <input id="submit" type="submit" value="Submit" />
      </form>
    );
  }
});
