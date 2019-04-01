import React from 'react';

//import ReactDOM from 'react-dom';
class Signup extends React.Component
{
  render() {
    return(
    <form name="signup-form" id="signup-form" method="POST" action="/signup">
      <div>
        <label htmlFor="first_name">First name</label><input type="text" name="first_name" id="first_name" />
        <div id="first-name-error" className="input-error">Required</div>
      </div>
      <div>
        <label htmlFor="last_name">Last name</label><input type="text" name="last_name" id="last_name" />
        <div id="last-name-error" className="input-error">Required</div>
      </div> 
      <div>
        <label htmlFor="email">Email</label><input type="email" name="email" id="email" />
        <div id="email-error" className="input-error">Required</div>
      </div>
      <div>
        <label htmlFor="password">Password</label><input type="password" name="password" id="password" />
        <div id="password-error" className="input-error">Required</div>
      </div>
      <div>
        <label htmlFor="email">Re-type password</label><input type="password" name="password2" id="password2" />
        <div id="password2-error" className="input-error">Required</div>
      </div>
      <div><button type="submit" id="btn-submit">Submit</button></div>    
    </form>
    );
  }
}

export default Signup;
