const db = require('../db');
const { hash } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const { SECRET } = require('../constants')

exports.getUsers = async (req, res) => {
  try {
    const { rows } = await db.query('select user_id, user_email from public.user')

    return res.status(200).json({
      success: true,
      users: rows,
    })
  } catch (error) {
    console.log(error.message)
  }
}

exports.register = async (req, res) => {
  const { email, password, fname, lname, admin } = req.body
  try {

    const user = await db.query("SELECT * FROM public.user WHERE user_email = $1", [
      email
    ]);

    const hashedPassword = await hash(password, 10)

    await db.query("INSERT INTO public.user (first_name, last_name, user_email, user_password, admin_status) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [fname, lname, email, hashedPassword, admin 
    ])

    return res.status(201).json({
      success: true,
      message: 'The registration was successful',
    })
    
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}

exports.login = async (req, res) => {
  let user = req.user

  let payload = {
    email: user.user_email,
  }

  try {
    const token = sign(payload, SECRET)

    return res.status(200).cookie('token', token, { httpOnly: true }).json({
      success: true,
      message: 'Logged in succefully',
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}

exports.protected = async (req, res) => {
  try {
    return res.status(200).json({
      info: 'protected info',
    })
  } catch (error) {
    console.log(error.message)
  }
}

exports.logout = async (req, res) => {
  try {
    return res.status(200).clearCookie('token', { httpOnly: true }).json({
      success: true,
      message: 'Logged out succefully',
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}
