import React, {Component} from 'react';

class PrimaryHeader extends Component 
{
  render() {
    return (
      <nav id="nav-wrap">
         <ul id="navigation" className="container">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/forum">Forum</a></li>
          <li><a href="/signup">Signup</a></li>
          <li><a href="/signin">Login</a></li>
        </ul>
      </nav>
    );
  }
}

export default PrimaryHeader;