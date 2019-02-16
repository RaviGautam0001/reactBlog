import React, { Component } from 'react'
import { validateAll } from 'indicative';

export class Signup extends Component {

  constructor(){
      super();
      this.state = {
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
          errors: {}
      }
  }  

  handleInputChange = (event) => {
      this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (event) => {
      event.preventDefault();
      console.log('state', this.state);

      //validating user Data

      const data = this.state;
      const rules = {
          name: 'required|string',
          email: 'required|email',
          password: 'required|string|min:6|confirmed',
      }

      const message = {
          required: 'The {{ field }} is required.',
          'email.email': 'The email is invalid',
          'password.confirmed': 'The password confirmation does not match.'
      }

      validateAll(data, rules,message)
        .then(() => {
            //register the user
        })
        .catch(errors => {
            //show validation errors
            const formattedErros = {};
            errors.forEach(error => formattedErros[error.field] = error.message);

            this.setState({ errors: formattedErros });
        })
  }

  render() {
    return (
        <div className="mh-fullscreen bg-img center-vh p-20" style={{backgroundImage: 'url(assets/img/bg-girl.jpg)'}}>
        <div className="card card-shadowed p-50 w-400 mb-0" style={{maxWidth: '100%'}}>
            <h5 className="text-uppercase text-center">Register</h5>
            <br />
            <br />
            <form className="form-type-material" onSubmit={this.handleSubmit}>
                
                <div className="form-group">
                    <input 
                    type="text" 
                    name="name"
                    className="form-control" 
                    placeholder="Username" 
                    onChange={this.handleInputChange}
                    />
                 { this.state.errors['name'] &&  <small className="text-danger">{this.state.errors['name']}</small> }
                </div>
                
                <div className="form-group">
                    <input 
                    type="text"
                    name="email" 
                    className="form-control" 
                    placeholder="Email address" 
                    onChange={this.handleInputChange}
                    />
                    { this.state.errors['email'] &&  <small className="text-danger">{this.state.errors['email']}</small> }
                </div>

                <div className="form-group">
                    <input 
                    type="password" 
                    name="password"
                    className="form-control" 
                    placeholder="Password" 
                    onChange={this.handleInputChange}
                    />
                    { this.state.errors['password'] &&  <small className="text-danger">{this.state.errors['password']}</small> }
                </div>

                <div className="form-group">
                    <input 
                    type="password" 
                    name="password_confirmation"
                    className="form-control" 
                    placeholder="Password (confirm)" 
                    onChange={this.handleInputChange}
                    />
                </div>

                <br />
                <button className="btn btn-bold btn-block btn-primary" type="submit">Register</button>
            </form>
            <hr className="w-30" />
            <p className="text-center text-muted fs-13 mt-20">Already have an account?
                <a href="login.html">Sign in</a>
            </p>
        </div>
    </div>
    )
  }
}

export default Signup
