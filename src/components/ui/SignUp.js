import React, { Component } from "react";
import {Link, withRouter} from 'react-router-dom'
import axios from 'axios'


class SignUp extends Component {

    constructor(props) {
        super(props)
        this.nameInput = React.createRef();
        this.ageInput = React.createRef();
        this.emailInput = React.createRef();
        this.passwordInput = React.createRef();

        this.state = {
            error : null
        }
      }

    handleSubmit = async (e) => {
        e.preventDefault()
        const user = {
            name: this.nameInput.current.value,
            age: this.ageInput.current.value,
            email: this.emailInput.current.value,
            password: this.passwordInput.current.value,
        }
      try {
        const res = await axios.post('/users', user)
        this.props.setToken(res.data.token)
        console.log(res)
        this.props.history.push('/todo')
       }
        catch(e){
            this.setState({
                error: 'This email already exists.'
            })
            // console.log('exception:',e)
        }

    }



    render() {
        return (
          <div className="inner">
            <form  onSubmit={this.handleSubmit}>
                <h3>Register</h3>

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" placeholder="Name" required ref={this.nameInput} />
                </div>

                <div className="form-group">
                    <label>Age</label>
                    <input type="number" min="0" className="form-control" placeholder="Age" ref={this.ageInput} />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" ref={this.emailInput} required/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" ref={this.passwordInput} required/>
                </div>

                <p style={{color:'#bf3636', textAlign:'center'}}>{this.state.error}</p>

                <button type="submit" className="btn btn-dark btn-lg btn-block" >Register</button>
                <p className="forgot-password text-right">
                    Already registered <Link to={'/'}>log in?</Link>
                </p>
            </form>
        </div>
        );
    }
}

export default withRouter(SignUp)


