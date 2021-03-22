import React , {useState} from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';
import Todo from '../ui/Todo';
import Login from '../ui/Login';
import SignUp from '../ui/SignUp';
import Profile from "../ui/Profile";
import DeleteAccountModal from "../ui/deleteAccountModal";
import Header from '../hoc/header';



function App() {
    const [token, setToken] = useState(null)
    let routes = (<Switch>
        <Route exact path='/' render={() => <Login setToken={setToken}/>} />
        <Route path="/sign-in" render={() => <Login setToken={setToken}/>} />
        <Route path="/sign-up" render={() => <SignUp setToken={setToken}/>} />
        <Redirect to = "/"/>
      </Switch>)

    if(token) {
        routes = (<Switch>
            <Route exact path='/' render={() => <Login setToken={setToken}/>} />
            <Route path="/sign-in" render={() => <Login setToken={setToken}/>} />
            <Route path="/sign-up" render={() => <SignUp setToken={setToken}/>} />
            <Route path="/todo" render={() => <Todo token={token}/>} />
            <Route path="/me" render={() => <Profile token={token}/>} />
            <Route path="/delete" render={() => <DeleteAccountModal token={token} setToken={setToken}/>} />
            <Redirect to = "/"/>
          </Switch>)
    }

    return (<Router>
        <div className="App">
            <Header token={token} setToken={setToken}/>
            <div className="outer">
                {routes}
            </div>
      </div></Router>
    );
  }




// class App extends Component {
//     render() {
//         return (
//             <StateProvider>
//                 <KeyStrokeHandler>
//                     <TodoList/>
//                 </KeyStrokeHandler>
//             </StateProvider>
//         );
//     }
// }

export default App;
