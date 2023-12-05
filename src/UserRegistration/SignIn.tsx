/* eslint-disable @typescript-eslint/no-explicit-any */

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link} from 'react-router-dom';

interface FormData {
  email: string;
  password: string;
}

const SignIn = () => {



  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const onSubmit = async (values: FormData, actions: any) => {
    console.log('The SignIn details are', values);
    // Simulate an API call or other asynchronous action
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();

    
  };

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
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <div className="form-container">
      <h2>Sign In Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            placeholder="Enter your email"
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email && touched.email ? 'input-error' : ''}
          />
          {touched.email && errors.email && <div className="error">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={values.password}
            placeholder="Enter your password"
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password ? 'input-error' : ''}
          />
          {touched.password && errors.password && <div className="error">{errors.password}</div>}
        </div>

        <div className="form-group">
        <Link to="/">
            <button disabled={!isValid || isSubmitting} type="submit">
              Sign In
            </button>
          </Link>
        </div>
      </form>
      <div className="signup-link">
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  );
};

export default SignIn;
