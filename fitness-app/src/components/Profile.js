import React from 'react'
import axios from 'axios'
import Update from './Update'
import UserData from './UserData'
import CalorieCounter from './CalorieCounter'


const Profile = ({user, setUser})=>{


const handleLogout = (e) => {
    
e.preventDefault(e)
console.log(user)
localStorage.removeItem('loginToken')
delete axios.defaults.headers.common['Authorization']
setUser({ auth:false, email:'' })
        
}


return(
<div>
<p>{`Hi ${user.email}`}</p>
<Update/>
<UserData/>
<CalorieCounter/>
<button type='submit' onClick= {e=> handleLogout(e)}>Logout</button>



</div>
)
}
export default Profile