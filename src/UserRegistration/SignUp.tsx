
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import UserServices from "../Axios/UserServices";
import './UserRegistration.css';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const userServices = UserServices();

  const addUser = async () => {
    try {
      const response = await userServices().addUser(values);

      console.log(response.data);
      alert("Sign Up Successful");
      navigate('/SignIn');

    } catch (error: any) {
      console.log('error adding post', error.message);
    }
  }

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleSubmit,
    handleBlur,
    isValid,
  } = useFormik<FormData>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: addUser,
  });

  return (
    <Container fluid >
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit} className="form-container">
            <h2 className="text-center">User Registration Form</h2>

            <Form.Group controlId="name"  className="form-group horizontal">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name (max 20 characters)"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.name && !!errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="email"  className="form-group horizontal">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Valid Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.email && !!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="password"  className="form-group horizontal">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="(Max 10 characters, no spaces)"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.password && !!errors.password}
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="confirmPassword"  className="form-group horizontal">
              <Form.Label>Confirm Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.confirmPassword && !!errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="d-flex justify-content-center">
  <Button disabled={!isValid || isSubmitting} type="submit"  >
    Sign Up
  </Button>
</Form.Group>
            <div className="signup-link text-center">
            <p>Already have an account? <Link to="/signin">Sign In</Link></p>
          </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
