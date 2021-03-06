import {
  Typography,
  Paper,
  makeStyles,
  Box,
  Button,
  Divider,
  CircularProgress
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAuthLoggedIn,
  getAuthRouteAfterLoggin
} from '../features/auth/selectors';
import { Link, Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '500px',
    margin: 'auto',
    textAlign: 'center',
    '& a': {
      textDecoration: 'none',
      color: theme.palette.primary.main
    }
  },
}));

const AuthForm = ({ title, submitText, onSubmit, links, children, loading }) => {
  const loggedIn = useSelector(getAuthLoggedIn);
  const redirectRoute = useSelector(getAuthRouteAfterLoggin);

  const classes = useStyles();
  const linkButtons = links.map(({ to, text }) => <Button key={to} color="primary"><Link to={to}>{text}</Link></Button>);

  if (loggedIn) {
    return <Redirect to={redirectRoute} />
  }
  return (
    <form className={classes.root} onSubmit={loading ? null : onSubmit}>
      <Paper elevation={4}>
        <Box p={3} pb={2}>
          <Box mb={3}>
            <Typography variant="h4" component="h1">{title}</Typography>
          </Box>
          {children}
          <Box mt={4}>
            <Button variant="contained" color="primary" type="submit" size="large" disabled={loading}>
              {
                loading
                  ? <CircularProgress size={25} />
                  : submitText
              }
            </Button>
          </Box>
          <Box mt={4} mb={2}>
            <Divider />
          </Box>
          <Box display="flex" justifyContent="space-around">{linkButtons}</Box>
        </Box>
      </Paper>
    </form>
  )
}

export default AuthForm
