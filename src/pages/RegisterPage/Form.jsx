import { useState } from 'react';
import { TextField, Box } from '@material-ui/core';
import AuthForm from '../../components/AuthForm';

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ // viena raidė ir simbolis
const isEmail = (value, message) => emailRegex.test(value.toLowerCase()) ? true : message;
const isStrongPassword = (value, message) => passwordRegex.test(value.toLowerCase()) ? true : message;
const isEqual = (value, otherValue, message) => value === otherValue ? true : message;

const Form = () => {
  const [email, setEmail] = useState('');
  const [repEmail, setRepEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repPassword, setRepPassword] = useState('');
  const [emailError, setEmailError] = useState(undefined);
  const [repEmailError, setRepEmailError] = useState(undefined);
  const [passwordError, setPasswordError] = useState(undefined);
  const [repPasswordError, setRepPasswordError] = useState(undefined);

  const createErrorComponent = (validationResults) =>
    <Box>
      {
        validationResults
          .filter(validationResult => validationResult !== true)
          .map(errorMsg => <Box>{errorMsg}</Box>)
      }
    </Box>;

  const validate = () => {
    const emailValidationResults = [
      isEmail(email, 'Email field is not a valid email addresss'),
      isEqual(email, repEmail, 'Emails does not match')
    ];
    if (emailValidationResults.every(x => x === true)) setEmailError(undefined);
    else setEmailError(createErrorComponent(emailValidationResults));

    const repEmailValidationResults = [
      isEmail(repEmail, 'Repeat email field is not a valid email addresss'),
      isEqual(email, repEmail, 'Emails does not match')
    ];
    if (repEmailValidationResults.every(x => x === true)) setRepEmailError(undefined);
    else setRepEmailError(createErrorComponent(repEmailValidationResults));

    const passwordValidationResults = [
      isStrongPassword(password, 'Password must have at least one letter, digit and at least 8 symbols'),
      isEqual(password, repPassword, 'Passwords do not match')
    ];
    if (passwordValidationResults.every(x => x === true)) setPasswordError(undefined);
    else setPasswordError(createErrorComponent(passwordValidationResults));

    const repPasswordValidationResults = [
      isStrongPassword(password, 'Repeat password must have at least one letter, digit and at least 8 symbols'),
      isEqual(password, repPassword, 'Passwords do not match')
    ];
    if (repPasswordValidationResults.every(x => x === true)) setRepPasswordError(undefined);
    else setRepPasswordError(createErrorComponent(repPasswordValidationResults));

    return [...emailValidationResults, ...repEmailValidationResults, ...passwordValidationResults, ...repPasswordValidationResults]
      .every(x => x === true)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const isFieldsValid = validate();
    if (isFieldsValid) alert('Geri duomenys')
  }

  return (
    <AuthForm
      title="Register"
      submitText="Register"
      onSubmit={handleSubmit}
      links={[
        { to: '/login', text: 'Login' },
        { to: '/forgot-password', text: 'Forgot password' },
      ]}
    >
      <Box mb={3}>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={e => setEmail(e.target.value)}
          fullWidth
          required
          error={emailError}
          helperText={emailError ?? false}
          size="small"
        />
      </Box>
      <Box mb={3}>
        <TextField
          label="Repeat email"
          variant="outlined"
          value={repEmail}
          onChange={e => setRepEmail(e.target.value)}
          fullWidth
          required
          error={repEmailError}
          helperText={repEmailError ?? false}
          size="small"
        />
      </Box>
      <Box mb={3}>
        <TextField
          label="Password"
          variant="outlined"
          value={password}
          onChange={e => setPassword(e.target.value)}
          fullWidth
          required
          error={passwordError}
          helperText={passwordError ?? false}
          size="small"
          type="password"
        />
      </Box>
      <Box mb={3}>
        <TextField
          label="Repeat password"
          variant="outlined"
          value={repPassword}
          onChange={e => setRepPassword(e.target.value)}
          fullWidth
          required
          error={repPasswordError}
          helperText={repPasswordError ?? false}
          size="small"
          type="password"
        />
      </Box>
    </AuthForm>
  )
}

export default Form
