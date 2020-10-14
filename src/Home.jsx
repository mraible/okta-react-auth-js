import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withOktaAuth } from '@okta/okta-react';

export default withOktaAuth(class Home extends Component {
  render() {
    if (this.props.authState.isPending) {
      return <div>Loading...</div>;
    }

    const button = this.props.authState.isAuthenticated ?
      <button onClick={() => {this.props.authService.logout()}}>Logout</button> :
      <button onClick={() => {this.props.history.push('/login')}}>Login</button>;

    return (
      <div>
        <Link to='/'>Home</Link><br/>
        <Link to='/protected'>Protected</Link><br/>
        {button}
      </div>
    );
  }
});
