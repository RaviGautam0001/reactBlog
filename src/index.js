import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, withRouter} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import Footer from './components/Footer';
import CreateArticle from './components/CreateArticle';
import Login from './components/Login';
import Signup from './components/Signup';
import SingleArticle from './components/SingleArticle';
import AuthService from './services/auth';


class App extends React.Component {

    constructor(){
      super();
      this.state = {
        authUser: null
      }
    }

    componentDidMount(){
      const user = localStorage.getItem('user');
      if(user){
        this.setState({ 
          authUser: JSON.parse(user)
         })
      }
    }

    setAuthUser = (authUser) => {
     this.setState({ authUser: authUser });
    }

    render(){
       const { location } = this.props; 
        return (
          <div>       
          { location.pathname !== '/login' && location.pathname !== '/signup' &&  <Navbar authUser={this.state.authUser} />  }
          <Route exact path="/" component={Welcome} />
          <Route 
           exact 
           path="/login" 
           render={
             (props) => <Login {...props} 
               setAuthUser={this.setAuthUser}
               loginUser={this.props.authService.loginUser}
             />  
           } />
          <Route 
           exact 
           path="/signup" 
           render={
             (props) => <Signup {...props} 
             registerUser={this.props.authService.registerUser}
             setAuthUser={this.setAuthUser} />} />
          <Route exact path="/article/:slug" component={SingleArticle} />
          <Route exact path="/articles/create" component={CreateArticle} />
          { location.pathname !== '/login' && location.pathname !== '/signup' && <Footer /> }
          </div>
        )

    }

}

const Main = withRouter((props) => {
      
  return (

     <App authService={new AuthService()}  {...props} />

  );
})


ReactDOM.render(
     <BrowserRouter>
      
      <Main />
      
     </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
