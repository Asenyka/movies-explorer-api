const router = require('express').Router();
const {
  updateUser, getCurrentUser,
} = require('../controllers/users');
const { validateUpdateUser } = require('../middlewares/validation');

router.get('/me', getCurrentUser);

router.patch('/me', validateUpdateUser, updateUser);

module.exports = router;
