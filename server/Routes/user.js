const router = require('express').Router();

//controller
const userController = require('../Controllers/user');

//middleware
const auth = require('../middleware/auth');
const emailCheck = require('../middleware/duplicateEmail');

router.put('/signup',emailCheck, userController.signup);
router.post('/login', userController.login);

//get user ingormation
router.put('/getUserDetails',userController.signup);

module.exports = router;
   