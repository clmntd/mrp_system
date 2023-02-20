import React from 'react';
import Button from 'react-bootstrap/Button';
import {MDBRow, MDBCol, MDBCard, MDBCardBody,MDBInput} from 'mdb-react-ui-kit';
import Logo from '../assets/ALL_VASCULAR_Colour.png';
import { onLogin } from '../api/auth';
import { authenticateUser } from '../redux/slices/authSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux'

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState(false)

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const dispatch = useDispatch()
  const onSubmit = async (e) => {
    e.preventDefault()
  
  try {
    await onLogin(values)
    dispatch(authenticateUser())

      localStorage.setItem('isAuth', 'true')

    } catch (error) {
      console.log(error.response.data.errors[0].msg)
      setError(error.response.data.errors[0].msg)
    }
  }

  return (
    <div className='login' style={{height:'100vh'}}>
      <img alt="" src={Logo} style={{ width: 350, height: 155 , marginTop: 50}} /> 
      <div>
        <form onSubmit={(e) => onSubmit(e)}>

        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol onSubmit={(e) => onSubmit(e)} col='12'>

            <MDBCard className='mx-auto' style={{maxWidth: '500px', backgroundColor: '#f5f5f5', borderColor: '#f5f5f5'}}>
              <MDBCardBody className=' d-flex flex-column align-items-center mx-auto w-100'>
                <h3 className="fw-bold mb-2 text-uppercase">Login</h3>
                <p className="text-50 mb-5">Please enter your email address and password!</p>
                <div style={{textAlign:'left'}}>
                <p className="text">Email Address</p>
                </div>
                <MDBInput wrapperClass='mb-4 mx-5 w-100' onChange={(e) => onChange(e)} placeholder='Please enter your Email Address' value={values.email} id='email' name='email' type='email' size="md"/>
                <div style={{textAlign:'left'}}>
                <p className="text">Password</p>
                </div>
                <MDBInput wrapperClass='mb-4 mx-5 w-100' onChange={(e) => onChange(e)} placeholder='Please enter your Password' value={values.password} id='password' name='password' type='password' size="md"/>
                <Button  className='mx- px-5 bg-danger text border-danger' size='lg' type='submit'>
                  Login
                </Button>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </form>
      </div>
    </div>
  );
}

export default Login;