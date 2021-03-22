import React from 'react'
import { Link,useHistory } from "react-router-dom";
import axios from 'axios'

export default function header(props) {
    const onLogout = async () => {
        await axios.post('/users/logout', { headers: { authorization: `Bearer ${props.token}` }})
        props.setToken(null)
        useHistory().push('/')
    }

    const noAuth = (
        <React.Fragment>
            <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Sign in</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
            </li>
        </ React.Fragment>)

    const auth = (
        <React.Fragment>
            <li className="nav-item">
                <Link className="nav-link" onClick={onLogout}>Log Out</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={"/me"}>Me</Link>
            </li>
        </React.Fragment>)



    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to={"/sign-in"}>Task Manager</Link>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav  nav-bar">
                          {props.token? auth: noAuth}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
