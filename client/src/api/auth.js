import axios from 'axios'
axios.defaults.withCredentials = false

export async function onRegistration(registrationData) {
  return await axios.post(
    'http://localhost:3002/authentication/adduser',
    registrationData
  )
}

export async function onLogin(loginData) {
  return await axios.post('http://localhost:3002/authentication/login', loginData)
}

export async function onLogout() {
  return await axios.get('http://localhost:3002/authentication/logout')
}

export async function fetchProtectedInfo() {
  return await axios.get('http://localhost:3002/authentication/protected')
}
