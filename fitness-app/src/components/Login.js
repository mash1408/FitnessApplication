import React, {useState} from 'react'
import axios from 'axios'
import '../Login.css';
const Login = ({setUser})=>{
  var [username, setUsername] = useState('')
  var [password, setPassword] = useState('')
  const [errors, setErrors] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors('')
    axios.post('users/login', {email:username,password:password})
    .then(res=> {
       localStorage.setItem('loginToken', res.data.token)
       axios.defaults.headers.common['Authorization'] =    
         'Bearer'+res.data.token
       setUser({ auth:true, name: res.data.username })
    })
    .catch(err=>{
       if(err.response){
         if(err.response.status===401) setErrors('Invalid credentials')
         else setErrors('Please try again.')
    }
       console.log(err)
    })
  }
  const handleSubmitRegister = (e) => {
    e.preventDefault()
    setErrors('')
    axios.put('users/signup', {email:username,password:password})
    .then(res=> {
      username=''
      password=''
      console.log(res)
      handleClick()
    })
    .catch(err=>{
       if(err.response){
         if(err.response.status===400) setErrors('Invalid credentials')
         else setErrors('Please try again.')
    }
       console.log(err)
    })
  }
  const handleClick = (e) => {
    e.preventDefault(); 
    var login = document.getElementsByClassName("login-form")[0];
    var register = document.getElementsByClassName("register-form")[0];
    if (login.style.display === "none") {
      login.style.display = "block";
      register.style.display = "none";
    } else {
      register.style.display = "block";
      login.style.display="none";
    }
  };
  return (
<div className="login-page">
  <div className="form">
    <form className="register-form">
      <input type="text" placeholder="email" onChange = {e=> setUsername(e.target.value)}/>
      <input type="password" placeholder="password" onChange = {e=> setPassword(e.target.value)}/>
      <button type='submit' onClick= {e=> handleSubmitRegister(e)}>create</button>
      <p className="message">Already registered? <a href="#" onClick={e => {handleClick(e)}}>Sign In</a></p>
    </form>
    <form className="login-form">
      <input type='text' name='username' placeholder='username'
      onChange = {e=> setUsername(e.target.value)}/>
      <input type='password' name='pass' placeholder='password'
      onChange = {e=> setPassword(e.target.value)}/>
      <button type='submit' onClick= {e=> handleSubmit(e)}>Submit</button>
      <p>{errors}</p>
      <button>login</button>
      <p className="message">Not registered? <a href="#" onClick={e => {handleClick(e)}}>Create an account</a></p>
    </form>
      
  </div>
</div>

)
}
export default Login