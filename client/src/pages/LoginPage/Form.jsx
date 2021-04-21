import { useFormik } from 'formik';
import { TextField, Box } from '@material-ui/core';
import AuthForm from '../../components/AuthForm';

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const isEmail = (value) => emailRegex.test(value.toLowerCase());

const Form = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate: (values) => {
      const errors = {}
      if (!isEmail(values.email)) {
        errors.email = 'Incorrect email'
      }
      return errors;
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values))
    }
  });

  return (
    <AuthForm
      title="Login"
      submitText="Login"
      onSubmit={formik.handleSubmit}
      links={[
        { to: '/register', text: 'Register' },
        { to: '/forgot-password', text: 'Forgot password' },
      ]}
    >
      <Box mb={3}>
      <TextField
        label="Email"
        variant="outlined"
        name="email"
        value={formik.values.email} 
        onChange={formik.handleChange} 
        error={!!formik.errors.email} 
        helperText={formik.errors.email ?? false} 
        fullWidth
        required
        size="small"
      />
      </Box>
      <TextField
        label="Password"
        variant="outlined"
        name="password"
        value={formik.values.password} 
        onChange={formik.handleChange} 
        fullWidth
        required
        size="small"
        type="password"
      />
    </AuthForm>
  )
}

export default Form
