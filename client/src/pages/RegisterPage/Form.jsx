import { useFormik } from 'formik';
import { TextField, Box } from '@material-ui/core';
import AuthForm from '../../components/AuthForm';

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ // viena raidė ir simbolis
const isEmail = (value, message) => emailRegex.test(value.toLowerCase()) ? true : message;
const isStrongPassword = (value, message) => passwordRegex.test(value.toLowerCase()) ? true : message;
const isEqual = (value, otherValue, message) => value === otherValue ? true : message;

const Form = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      repEmail: '',
      password: '',
      repPassword: '',
    },
    validate: ({ email, repEmail, password, repPassword }) => {
      const errors = {};

      const emailValidationResults = [
        isEmail(email, 'Email field is not a valid email addresss'),
        isEqual(email, repEmail, 'Emails does not match')
      ];

      if (emailValidationResults.some(x => x !== true))
        errors.email = createErrorComponent(emailValidationResults);

      const repEmailValidationResults = [
        isEmail(repEmail, 'Repeat email field is not a valid email addresss'),
        isEqual(email, repEmail, 'Emails does not match')
      ];
      if (repEmailValidationResults.some(x => x !== true))
        errors.repEmail = createErrorComponent(repEmailValidationResults);

      const passwordValidationResults = [
        isStrongPassword(password, 'Password must have at least one letter, digit and at least 8 symbols'),
        isEqual(password, repPassword, 'Passwords do not match')
      ];
      if (passwordValidationResults.some(x => x !== true))
        errors.password = createErrorComponent(passwordValidationResults);

      const repPasswordValidationResults = [
        isStrongPassword(password, 'Repeat password must have at least one letter, digit and at least 8 symbols'),
        isEqual(password, repPassword, 'Passwords do not match')
      ];
      if (repPasswordValidationResults.some(x => x !== true))
        errors.repPassword = createErrorComponent(repPasswordValidationResults);

      return errors;
    },
    onSubmit: values => {
      alert(JSON.stringify(values))
    }
  });

  const createErrorComponent = (validationResults) =>
    <>
      {
        validationResults
          .filter(validationResult => validationResult !== true)
          .map(errorMsg => <Box component="span" key={errorMsg} style={{ display: 'block' }} >{errorMsg}</Box>)
      }
    </>;

  console.log(formik.touched);

  return (
    <AuthForm
      title="Register"
      submitText="Register"
      onSubmit={formik.handleSubmit}
      links={[{ to: '/login', text: 'Login' }]}
    >
      <Box mb={3}>
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          // helperText={formik.touched.email && formik.errors.email !== undefined ? formik.errors.email : false}
          helperText={formik.touched.email && formik.errors.email}
          required
          fullWidth
          size="small"
        />
      </Box>
      <Box mb={3}>
        <TextField
          label="Repeat email"
          variant="outlined"
          name="repEmail"
          value={formik.values.repEmail}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.repEmail && !!formik.errors.repEmail}
          helperText={formik.touched.repEmail && formik.errors.repEmail}
          required
          fullWidth
          size="small"
        />
      </Box>
      <Box mb={3}>
        <TextField
          label="Password"
          variant="outlined"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && !!formik.errors.password}
          helperText={formik.touched.password && formik.errors.password}
          required
          fullWidth
          size="small"
          type="password"
        />
      </Box>
      <Box mb={3}>
        <TextField
          label="Repeat password"
          variant="outlined"
          name="repPassword"
          value={formik.values.repPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.repPassword && !!formik.errors.repPassword}
          helperText={formik.touched.repPassword && formik.errors.repPassword}
          required
          fullWidth
          size="small"
          type="password"
        />
      </Box>
    </AuthForm>
  )
}

export default Form
