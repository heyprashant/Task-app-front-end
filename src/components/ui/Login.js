import React, { Component } from "react"
import {Link, withRouter} from 'react-router-dom'
import axios from 'axios'

class Login extends Component {
    constructor(props) {
        super(props)
        this.emailInput = React.createRef();
        this.passwordInput = React.createRef();

        this.state = {
            error : null
        }
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
            this.setState({
                error: 'Your mail or password is invalid, please try again.'
            })
            // console.log('exception:',e)
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
                <p style={{color:'#bf3636', textAlign:'center'}}>{this.state.error}</p>
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
