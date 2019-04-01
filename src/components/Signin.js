import React from 'react';
import Superagent from 'superagent';
import './Signin.css';
class Signin extends React.Component
{
  constructor() {
    super();
    this.submitUserLogin = this.submitUserLogin.bind(this);
    this.setUserData = this.setUserData.bind(this);
  }
  
  setUserData(responseData) {
    if (typeof responseData !== 'undefined')
      this.processLoginResponse(responseData.body);
  }

  processLoginResponse(responseData = [ ]) {
    if (responseData.length && responseData[0].success === 0)
    {
      responseData.map((obj) => {
        const selector = '.error-'+obj.name;
        document.querySelector(selector).style.display = 'block';
        document.querySelector(selector).innerHTML = obj.message;
      });
    }
    else if(responseData.length && responseData[0].success === 1)
      window.location.href = '/profile';
  }

  submitUserLogin() {
    if (!document.querySelector('#login-form'))
      return null;
    
    const elems = document.querySelector('#login-form').elements;
    const postData = {
      email: elems.email.value,
      password: elems.password.value
    }

    const responseMessage = [ ];
    if (!postData.email || postData.email.length === 0)
    {
      responseMessage.push({
        name: 'email',
        message: 'Email is required',
        success: 0
      });
    }
    
    if (!postData.password || postData.password.length === 0)
    {
      responseMessage.push({
        name: 'password',
        message: 'Password is required',
        success: 0
      });
    }
    
    if (!responseMessage.length)
    {
      Superagent
        .post('http://127.0.0.1:5000/api/login/')
        .query(postData)
        .then(this.setUserData);
    }
    else
      this.processLoginResponse(responseMessage);
  }
  render() {
    return(
      <form id="login-form" action="/signin" method="POST">
        <div className="error-unknown error-message"></div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" />
          <div className="error-email error-message"></div>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
          <div className="error-password error-message"></div>
        </div>
        <div><button type="button" id="btn-submit" onClick={this.submitUserLogin}>Submit</button></div>
      </form>
    );
  }
}

export default Signin;