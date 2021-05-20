import { useFormik } from 'formik';
import { TextField, Box } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import AuthForm from '../../components/AuthForm';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/auth/actions';
import {
  getAuthLoginLoading,
  getAuthLoginErr,
} from '../../features/auth/selectors';

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const isEmail = (value) => emailRegex.test(value.toLowerCase());

const Form = () => {
  const loading = useSelector(getAuthLoginLoading);
  const error = useSelector(getAuthLoginErr);
  const dispatch = useDispatch();

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
    onSubmit: ({ email, password }) => {
      dispatch(login(email, password));
    }
  });

  return (
    <AuthForm
      title="Login"
      submitText="Login"
      onSubmit={formik.handleSubmit}
      links={[{ to: '/register', text: 'Register' },]}
      loading={loading}
    >
      {
        !!error
          ? <Box my={2}><Alert severity="error">{error}</Alert></Box>
          : null
      }
      <Box mb={3}>
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          value={formik.values.email}
          onChange={loading ? null : formik.handleChange}
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
        onChange={loading ? null : formik.handleChange}
        fullWidth
        required
        size="small"
        type="password"
      />
    </AuthForm>
  )
}

export default Form
