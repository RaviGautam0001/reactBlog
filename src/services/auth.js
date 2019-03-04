import Axios from 'axios';
import { validateAll } from 'indicative';
import config from '../config';

export default class AuthService {
    
      async registerUser (data) {
 
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
  
        try{
          await validateAll(data, rules,message)
          const response = await Axios.post(`${config.apiUrl}/auth/register`, {
            name: data.name,
            email: data.email,
            password: data.password
           }) 
           return response.data.data;
            
        }catch(errors){
          const formattedErros = {}; 
          if(errors.response.status === 422){

            formattedErros['email'] = errors.response.data['email'][0];
            return Promise.reject(formattedErros);
          }   
            errors.forEach(error => formattedErros[error.field] = error.message);
            return Promise.reject(formattedErros);
        }
      }

      async loginUser (data) {
 
        const rules = {
            email: 'required|email',
            password: 'required|string',
        }
  
        const message = {
            required: 'The {{ field }} is required.',
            'email.email': 'The email is invalid',
        }
  
        try{
          await validateAll(data, rules,message)
          const response = await Axios.post(`${config.apiUrl}/auth/login`, {
            email: data.email,
            password: data.password
           }) 
           return response.data.data;
            
        }catch(errors){
          const formattedErros = {};   
          if(errors.response.status === 401){
            formattedErros['email'] = 'Invalid credentials.';
            return Promise.reject(formattedErros);
          }   
            errors.forEach(error => formattedErros[error.field] = error.message);
            return Promise.reject(formattedErros);
        }
      }
}