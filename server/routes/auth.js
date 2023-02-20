const { Router } = require('express')
const {
  getUsers,
  register,
  login,
  protected,
  logout,
} = require('../controllers/auth')
const {
  validationMiddleware,
} = require('../middleware/validations-middleware')
const { registerValidation, loginValidation } = require('../validators/auth')
const { userAuth } = require('../middleware/auth-middleware')
const router = Router()

router.get('/getusers', getUsers)
router.get('/protected', userAuth, protected)
router.post('/adduser', registerValidation, validationMiddleware, register)
router.post('/login', loginValidation, validationMiddleware, login)
router.get('/logout', logout)

module.exports = router