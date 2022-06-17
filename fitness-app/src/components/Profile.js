import React from 'react'
import axios from 'axios'
import Update from './Update'
import {useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Profile = ({user, setUser})=>{
var [age, setAge] = useState('')
var [gender, setGender] = useState('')
var [height, setHeight] = useState('')
var [weight, setWeight] = useState('')
var [activity, setActivity] = useState('')
var [errors, setErrors] = useState('')

const handleLogout = (e) => {
e.preventDefault(e)
console.log(user)
localStorage.removeItem('loginToken')
delete axios.defaults.headers.common['Authorization']
setUser({ auth:false, email:'' })
        
}

const postData =(e) =>{
    e.preventDefault(e)
     axios.put('calories/getUserDetails',{height:height, weight: weight, age: age, activity: activity, gender: gender},{
        headers: {"Authorization" : localStorage.getItem('loginToken')}
     })      
     .then(res=>{
         console.log(res.data)
     })
     .catch(err=>{
        if(err.response){
          if(err.response.status===400) setErrors('Invalid Data')
          else setErrors('Please try again.')
     }
        console.log(err)
     })
}
return(
<div>
<p>{`Hi ${user.email}`}</p>
<Update/>
<form>
    <label>Gender:</label>
    <input type="radio" value="male" onChange = {e=> setGender(e.target.value)}/>
    <input type="radio" value="male" onChange = {e=> setGender(e.target.value)}/>
    <label>Height(cm):</label>
    <input type="number" onChange = {e=> setHeight(e.target.value)}/>
    <label>Weight(kg):</label>
    <input type="number" onChange = {e=> setWeight(e.target.value)}/>
    <label>Age:</label>
    <input type="number" onChange = {e=> setAge(e.target.value)}/>
    <label>Activity Level:</label>
    <input type="radio" value="not active" onChange = {e=> setActivity(e.target.value)}/>
    <input type="radio" value="active" onChange = {e=> setActivity(e.target.value)} />
    <input type="radio" value="very active" onChange = {e=> setActivity(e.target.value)}/>
    <button type='submit' onClick= {e=> postData(e)}>Submit</button>
    
</form>
<input></input>
<button type='submit' onClick= {e=> handleLogout(e)}>Logout</button>



</div>
)
}
export default Profile