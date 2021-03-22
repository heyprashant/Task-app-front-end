import React, { Component } from "react"
import {Link, withRouter} from 'react-router-dom'
import axios from 'axios'

class Login extends Component {
    constructor(props) {
        super(props)
        this.emailInput = React.createRef();
        this.passwordInput = React.createRef();
      }

      handleSubmit = async (e) => {
        e.preventDefault()
        const user = {
            email: this.emailInput.current.value,
            password: this.passwordInput.current.value,
        }
      try {
        const res = await axios.post('/users/login', user)
        this.props.setToken(res.data.token)
        this.props.history.push('/todo')
        console.log(res)
       }
        catch(e){
            console.log('exception:',e)
        }

    }


    render() {
        return (
          <div className="inner">
            <form onSubmit={this.handleSubmit}>

                <h3>Log in</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" required ref={this.emailInput} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" required ref={this.passwordInput} />
                </div>

                {/* <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div> */}

                <button type="submit" className="btn btn-dark btn-lg btn-block" >Sign in</button>
                <p className="forgot-password text-right">
                    Don't have an account? <Link to={'/sign-up'}>Sign Up</Link>
                </p>
            </form>
        </div>
        );
    }
}

export default withRouter(Login)
