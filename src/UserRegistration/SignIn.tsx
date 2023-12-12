
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
// import axios from 'axios';
import './UserRegistration.css';
import UserServices from '../Axios/UserServices';
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


  const handleSubmit = async () => {
    try {
      let isValid = true;

      if (isValid) {
        // Use getRegisteredUsers method from UserServices
        const result = await userServices().getRegisteredUsers();

        let emailFound = false;

        // Use the async version of map when working with Promises
        await Promise.all(result.data.map(async (RegisteredUsers: any) => {
          if (RegisteredUsers.email === formData.email) {
            emailFound = true;
            if (RegisteredUsers.password === formData.password) {
              alert('Sign In Successful');
              navigate('/');
              // Use addSignedInUser method from UserServices
              await userServices().addSignedInUser({
                email: formData.email,
                password: formData.password,
              });
            } else {
              isValid = false;
              setValidationErrors((prevErrors) => ({
                ...prevErrors,
                password: 'Wrong Password',
              }));
            }
          }
        }));

        if (!emailFound) {
          isValid = false;
          setValidationErrors((prevErrors) => ({
            ...prevErrors,
            email: 'Email Id not Registered',
          }));
        }
      }
    } catch (error) {
      console.error('Error in sign-in:', error);
      // Handle the error as needed
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

  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form onSubmit={formikHandleSubmit} className="form-container">
            <h2 className="text-center">Sign In Form</h2>

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
    </Container>
  );
};

export default SignIn;
