const User = require("../models/user")
module.exports = async(req, res, next) => {
  const duplicate = await User.findOne({ email: req.body.email });
  if(duplicate){
    res.status(409).json({ msg: ' Email already exists'});
  }
  next()
}