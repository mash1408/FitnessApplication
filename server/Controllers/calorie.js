const Calorie = require('../models/calorie');
const User = require('../models/user');




//getting user information for calculating calorie intake
exports.getUserInfo = async (req, res, next) => {
    const { gender, activity, height, weight, age } = req.body;
    try{
      var BMR;
        if(gender=="women")
            BMR = 655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age)
        else
            BMR = 66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age)
      //calculate AMR (calories burned through exercise and movemnet)
      var AMR
        if(activity == "not active")
            AMR = BMR * 1.2
        if(activity == "active")
            AMR = BMR * 1.55
        else 
            AMR = BMR * 1.9


      //getting user ID
      


          const calorie = new Calorie({
            userId: req.userId,
            height: parseInt(height),
            weight:parseInt(weight),
            age:parseInt(age),
            gender: gender,
            maintainanceCalorie: AMR,
            calorieGoal: (AMR-500),
            activity: activity,
          });
    
        calorie.save();
        res.status(201).json({ msg: 'user info gathered'});
        } catch(err) {
          res.status(500).json({ error: err, });
        }
    
  };