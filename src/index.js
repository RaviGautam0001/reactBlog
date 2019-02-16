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


const Main = withRouter(({ location }) => {
      
  return (

        <div>       
            { location.pathname !== '/login' && location.pathname !== '/signup' &&  <Navbar />  }
            <Route exact path="/" component={Welcome} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/article/:slug" component={SingleArticle} />
            <Route exact path="/articles/create" component={CreateArticle} />
            { location.pathname !== '/login' && location.pathname !== '/signup' && <Footer /> }
        </div>

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
