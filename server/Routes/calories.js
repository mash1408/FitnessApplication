const router = require('express').Router();
const getCaloriesDetails= require('../Controllers/getCalorieDetails');

const calorieController = require('../Controllers/calorie');
const auth = require('../middleware/auth');
//get calorie details of one ingredient
router.post('/getCalorieDetails',auth,getCaloriesDetails.updateCalories );
//get user info of calories
router.put('/getUserDetails',auth,calorieController.getUserInfo );

//update user calories intake

module.exports = router; 