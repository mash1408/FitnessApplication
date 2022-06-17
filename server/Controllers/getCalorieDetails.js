var axios = require('axios');
const Calorie = require('../models/calorie');


exports.updateCalories = (req, res, next) => {
     const  {foodItem} = req.body;
var config = {
  method: 'get',
  url: 'https://calorieninjas.p.rapidapi.com/v1/nutrition?query='+foodItem,
  headers: { 
    'X-RapidAPI-Key': 'de861f9665msh632d4e9f0f5d15ep1de5ebjsn87f16d17d4bd', 
    'X-RapidAPI-Host': 'calorieninjas.p.rapidapi.com'
  }
};



axios(config)
.then(async function (response) {
  //get date and time
  var today = new Date();
  var date = today.getDate();
  
  //update caloriesconsumed
    
    let items = response.data
    var total = 0;
    items.items.forEach((item, i) =>{
      total += item.calories
    });
    Calorie.findOne({ userId: req.userId })
    .then(function(doc) {
      if(!doc)
          throw new Error('No record found.');
      
       Calorie.updateOne({userId:req.userId}, 
            {caloriesConsumedtoday:total+doc.caloriesConsumedtoday}, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Updated Docs : ", docs);
            }
        })
        res.status(200).json({currentCalories:total+doc.caloriesConsumedtoday, calorieGoal: doc.calorieGoal, maintainanceCalorie: doc.maintainanceCalorie})
})

     

    


  
})
.catch(function (error) {
  res.status(500).json(error)
});
}

 