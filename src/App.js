import React, { Component } from 'react';
import './App.css';
import { Switch,Route} from 'react-router-dom';
import Home from './components/Home';
import PrimaryHeader from './components/PrimaryHeader';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Signin from './components/Signin';
import About from './components/About';
import Forum from './components/Forum';
import Profile from './components/Profile';
import NotFound from './components/NotFound';

class App extends Component {
 
  
  render() {
    return (
      <div id="wrapper">
        <PrimaryHeader />
        <div id="content">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/forum' component={Forum} />
            <Route path='/about' component={About} />
            <Route path='/signup' component={Signup} />
            <Route path='/signin' component={Signin} />
            <Route path='/profile' component={Profile} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
