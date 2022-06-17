import React,{useState} from 'react'
import axios from 'axios'
import Login from './components/Login'
import Profile from './components/Profile'
import './App.css';
axios.defaults.baseURL = 'http://localhost:5000'
const App = ()=> {
  const [user, setUser] = useState({ auth:false, email:''})
  return (
     <div className="App">
        { user.auth?
            <Profile user={user} setUser={setUser}/>
          :
            <Login setUser={setUser}/>
        }
     </div>
  );
}
export default App;
