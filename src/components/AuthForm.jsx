import {
    Typography,
    Paper,
    makeStyles,
    Box,
    Button,
    Divider
  } from '@material-ui/core';
  import { Link } from 'react-router-dom';
  
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
  
  const AuthForm = ({ title, submitText, onSubmit, links, children }) => {
    const classes = useStyles();
    const linkButtons = links.map(({ to, text }) => <Button color="primary"><Link to={to}>{text}</Link></Button>);
  
    return (
      <form className={classes.root} onSubmit={onSubmit}>
        <Paper elevation={4}>
          <Box p={3} pb={2}>
            <Typography variant="h4" component="h1" gutterBottom>{title}</Typography>
            {children}
            <Box mt={3}>
              <Button variant="contained" color="primary" type="submit">{submitText}</Button>
            </Box>
            <Box mt={3} mb={2}>
              <Divider />
            </Box>
            <Box display="flex" justifyContent="space-around">{linkButtons}</Box>
          </Box>
        </Paper>
      </form>
    )
  }
  
  export default AuthForm