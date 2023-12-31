/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import {  useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
// import axios from 'axios';
import './UserRegistration.css';
import UserServices from '../Axios/UserServices';
import { useAuth } from '../UseAuth/AuthContext';
import {ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';




interface FormData {
  email: string;
  password: string;
}

const SignIn = () => {
  const userServices = UserServices();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [validationErrors, setValidationErrors] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const { setSignedIn, SignIn} =useAuth();
  const checkSignedIn=()=>{
    const storedUser=localStorage.getItem('IsSignedIn');
    setSignedIn(!!storedUser);
  };
  
  const handleSubmit = async () => {
    try {
      let isValid = true;

      if (isValid) {

        const result = await userServices().getRegisteredUsers();

        let emailFound = false;

        await Promise.all(result.data.map(async (RegisteredUsers: any) => {
          if (RegisteredUsers.email === formData.email) {
            emailFound = true;
            if (RegisteredUsers.password === formData.password) {
        
            SignIn({ email: formData.email, password: formData.password });
            toast.success('Sign In Successful');
              setSignedIn(true);
             
              navigate('/ForArtists');
              
            } else {
              isValid = false;
              setValidationErrors((prevErrors) => ({
                ...prevErrors,
                password: 'Wrong Password',
              }));
              toast.error('Wrong Password');
            }
          }
        }));

        if (!emailFound) {
          isValid = false;
          setValidationErrors((prevErrors) => ({
            ...prevErrors,
            email: 'Email Id not Registered',
          }));
          toast.error('Email Id not Registered'); 
        }
      }
    } catch (error) {
      console.error('Error in sign-in:', error);
    }
  };
  

  const {
    
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleSubmit: formikHandleSubmit,
    handleBlur,
    isValid,
  } = useFormik<FormData>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });
  useEffect(() => {
    checkSignedIn();
}, []);
  return (
    <Container fluid >
      <Row className="justify-content-md-center" >
        <Col md={6} className='ColForm'>
          <Form onSubmit={formikHandleSubmit} className="form-container">
            <h2 className="text-center">Sign In For Artist</h2>

            <Form.Group controlId="email" className="form-group horizontal">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={values.email}
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  setFormData({ ...formData, email: e.target.value });
                  
                }}
                isInvalid={touched.email && !!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              {validationErrors.email && <Alert variant="danger">{validationErrors.email}</Alert>}
            </Form.Group>

            <Form.Group controlId="password" className="form-group horizontal">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={values.password}
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  setFormData({ ...formData, password: e.target.value });
                }}
                isInvalid={touched.password && !!errors.password}
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              {validationErrors.password && <Alert variant="danger">{validationErrors.password}</Alert>}
            </Form.Group>

            <Form.Group className="d-flex justify-content-center">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Sign In
              </Button>
            </Form.Group>
            
            <div className="signup-link text-center">
            <p>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
          </Form>

          
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};



export default SignIn;

