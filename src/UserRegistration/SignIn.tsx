/* eslint-disable @typescript-eslint/no-explicit-any */

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link ,useNavigate} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';


interface FormData {
  email: string;
  password: string;
}

const SignIn = () => {

const [formData,setFormData]=useState({
  email:'',
  password:''
});
const [validationErrors, setValidationErrors] = useState({
  email: '',
  password: '',
});

const navigate =useNavigate()

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });


const handleSubmit =()=>{

  let isValid=true;

if (isValid) {
  axios.get('http://localhost:3000/RegisteredUsers')
    .then((result) => {
      let emailFound = false;

      result.data.map((RegisteredUsers: any) => {
        if (RegisteredUsers.email === formData.email) {
          emailFound = true;
          if (RegisteredUsers.password === formData.password) {
            alert("Sign Up Successful");
            navigate('/');
          } else {
            isValid = false;
            setValidationErrors((prevErrors) => ({
              ...prevErrors,
              password: "Wrong Password",
            }));
          }
        }
      });

      if (!emailFound) {
        isValid = false;
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          password: "Email Id not Registered",
        }));
      }
    })
    .catch((err) => console.log(err));
}
};
  const {
    values,
    errors,
    touched,
    isSubmitting,
   handleChange,
   handleSubmit:formikHandleSubmit,
    handleBlur,
   
    isValid,
  } = useFormik<FormData>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit:handleSubmit,
  });

  return (
    <div className="form-container">
      <h2>Sign In Form</h2>
      <form onSubmit={formikHandleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            placeholder="Enter your email"
            onBlur={handleBlur}
           onChange={(e)=>{
            handleChange(e);
           setFormData({...formData,email:e.target.value});
          }
          }
            className={errors.email && touched.email ? 'input-error' : ''}
          />
          {touched.email && errors.email && <div className="error">{errors.email}</div>}
          {validationErrors.email&& <div className="error">{validationErrors.email}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={values.password}
            placeholder="Enter your password"
            onBlur={handleBlur}
            onChange={(e)=>{
              handleChange(e);
              setFormData({...formData,password:e.target.value})}}
             className={errors.password && touched.password ? 'input-error' : ''}
          />
          {touched.password && errors.password && <div className="error">{errors.password}</div>}
      
          {validationErrors.password && <div className="error">{validationErrors.password}</div>}
        </div>

        <div className="form-group">
    
            <button disabled={!isValid || isSubmitting} type="submit">
              Sign In
            </button>
          
        </div>
      </form>
      <div className="signup-link">
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  );
};

export default SignIn;
