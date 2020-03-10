import React, { Component } from 'react';
import isEmail from 'validator/lib/isEmail';


export default class  ContactForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            message: ''

        }
        //this.state = {value: ''};

    }
    handleChange = (e) => {
        this.setState({value: e.target.value})
    }
    handleSubmit = (e) => {
        e.preventDefault();

    }
    validate = data => {
        const errors = {};
          if (!isEmail(data.email)) errors.email = 'Email is required';
          if (!data.password) errors.password = 'Password is required';
        return errors;
    };

    render() {
        return (
            <form action="" onSubmit = {this.handleSubmit}>
                <div className="container" onSubmit = {this.handleSubmit}>
                    <h3>Register</h3>
                    <p>Please fill in this form to create an account.</p>
                    <hr/>
                    
                    <label htmlFor="name"><b>Name</b></label><br />
                    <input
                        type="text" 
                        placeholder="Enter Name" 
                        name="name" 
                        required 
                        onChange ={this.handleChange}
                    />

                    <label htmlFor="email"><b>Email</b></label><br />
                    <input 
                        type="email" 
                        placeholder="Enter Email" 
                        name="email" 
                        required 
                        onChange={this.handleChange}
                    />

                    <label htmlFor="message"><b>Message</b></label><br />
                    <input 
                        type="text" 
                        placeholder="Enter Message" 
                        name="message" 
                        required
                        onChange={this.handleChange}
                    />

                    <hr/>

                    <button type="submit" className="registerbtn">Send</button> 
                    <button type="submit" className="registerbtn">Cancel</button>

                </div>    
            </form>
        );
    }
}




