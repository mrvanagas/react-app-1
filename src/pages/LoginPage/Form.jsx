import { useState } from 'react';
import { TextField, Box } from '@material-ui/core';
import AuthForm from '../../components/AuthForm';

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const isEmail = (value) => emailRegex.test(value.toLowerCase());

const Form = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(undefined);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isEmail(email)) {
      setEmailError(undefined);
      // ka daryt jei viskas gerai
    } else {
      setEmailError('Not an email');
    }
  }

  return (
    <AuthForm
      title="Login"
      submitText="Login"
      onSubmit={handleSubmit}
      links={[
        { to: '/register', text: 'Register' },
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
          type="email"
        />
      </Box>
      <TextField
        label="Password"
        variant="outlined"
        value={password}
        onChange={e => setPassword(e.target.value)}
        fullWidth
        required
        size="small"
        type="password"
      />
    </AuthForm>
  )
}

export default Form
