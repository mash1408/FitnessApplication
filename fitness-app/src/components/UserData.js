import React, {useState} from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UserData  = ()=>{
    var [age, setAge] = useState('')
    var [gender, setGender] = useState('')
    var [height, setHeight] = useState('')
    var [weight, setWeight] = useState('')
    var [activity, setActivity] = useState('')
    

    const postData =(e) =>{
        e.preventDefault(e)
         axios.put('calories/getUserDetails',{height:height, weight: weight, age: age, activity: activity, gender: gender},{
            headers: {"Authorization" : localStorage.getItem('loginToken')}
         })      
         .then(res=>{
             console.log(res.data)
             toast.info(res.data.msg);
         })
         .catch(err=>{
            if(err.response){
              if(err.response.status===400) toast.error('invalid data')
              else toast.error('please try again')
         }
            console.log(err)
         })
    }

    return (
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
        <ToastContainer
position="bottom-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
    </form>
        

  
  )
  }


  export default UserData;