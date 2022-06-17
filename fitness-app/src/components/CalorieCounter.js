import React, {useState} from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CalorieCounter = () => {
    var [item, setItem] = useState('')
    var [caloriesConsumedToday, setCaloriesConsumedToday] = useState(0)
    var [maintainanceCalorie, setMaintainanceCalorie] = useState(0)
    var [calorieGoal, setCalorieGoal] = useState(0)

    const updateCalories = (e) => {
    e.preventDefault();
    axios.post('calories/getCalorieDetails', {foodItem:item},{
        headers: {"Authorization" : localStorage.getItem('loginToken')}
     })
    .then(res=>{
        console.log(res.data)
        toast.info(res.data.msg);
        setCaloriesConsumedToday(res.data.currentCalories)
        setMaintainanceCalorie(res.data.maintainanceCalorie)
        setCalorieGoal(res.data.calorieGoal)
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
        <div>
        <p>{`CaloriesConsumedToday:${caloriesConsumedToday}`}</p>
        <p>{`CalorieGoal:${calorieGoal}`}</p>
        <p>{`MaintainanceCalories:${maintainanceCalorie}`}</p>
        <form>   
        <label>Add Food That You Consumed</label>
        <input type="text"  onChange = {e=> setItem(e.target.value)}/>
        <button type='submit' onClick= {e=> updateCalories(e)}>Submit</button> 
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

        </div>           
        )

}

export default CalorieCounter;