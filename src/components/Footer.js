import React from 'react';
//import ReactDOM from 'react-dom';
class Footer extends React.Component
{
  render() {
    return(
      <footer id="footer">
        <ul id="navigation" className="container">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/forum">Forum</a></li>
        </ul>
      </footer>
    );
  }
}

export default Footer;
