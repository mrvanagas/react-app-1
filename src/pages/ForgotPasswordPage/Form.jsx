import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import AuthForm from '../../components/AuthForm';

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const isEmail = (value) => emailRegex.test(value.toLowerCase());

const Form = () => {
  const [email, setEmail] = useState('');
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
      title="Forgot password"
      submitText="Send password reset link"
      onSubmit={handleSubmit}
      links={[
        { to: '/login', text: 'Login' },
        { to: '/register', text: 'Register' },
      ]}
    >
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
    </AuthForm>
  )
}

export default Form;
