const { check } = require('express-validator')
const db = require('../db')
const { compare } = require('bcryptjs')

// //password
const password = check('password')
  .isLength({ min: 6, max: 15 })
  .withMessage('Password has to be between 6 and 15 characters.')

// //email
const email = check('email')
  .isEmail()
  .withMessage('Please provide a valid email.')

//check if email exists
const emailExists = check('email').custom(async (value) => {
  const { rows } = await db.query('SELECT * from public.user WHERE user_email = $1', [
    value,
  ])

  if (rows.length) {
    throw new Error('Email already exists.')
  }
})

//login validation
const loginFieldsCheck = check('email').custom(async (value, { req }) => {
  const user = await db.query('SELECT user_id, admin_status, first_name, user_email, user_password, last_name from public.user WHERE user_email = $1', [value])
  //console.log(user.rows[0]);

  if (!user.rows.length) {
    console.log('Email does not exists.')
  }
  else {
    console.log(req.body.password)
    console.log(user.rows[0].user_password)
  }

  const validPassword = await compare(req.body.password, user.rows[0].user_password)

  if (!validPassword) {
    throw new Error('Wrong password')
  }

  req.user = user.rows[0];
})

module.exports = {
  registerValidation: [email, password, emailExists],
  loginValidation: [loginFieldsCheck],
}
