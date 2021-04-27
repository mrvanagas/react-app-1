import React from 'react';
import { AppBar, Toolbar, Container, makeStyles, Box } from '@material-ui/core';
import { NavLink } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.primary.contrastText,
    textDecoration: 'none',
    fontSize: '1.25rem',
    marginRight: '1rem',
    '&:hover': {
      color: '#ccc'
    }
  },
  linkActive: {
    textDecoration: 'underline'
  }
}));

const Navbar = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Box>
              <NavLink className={classes.link} activeClassName={classes.linkActive} exact to="/">Home</NavLink>
              <NavLink className={classes.link} activeClassName={classes.linkActive} exact to="/counter">Counter</NavLink>
              <NavLink className={classes.link} activeClassName={classes.linkActive} exact to="/calculator">Calculator</NavLink>
              <NavLink className={classes.link} activeClassName={classes.linkActive} exact to="/material-ui">Material-ui</NavLink>
              <NavLink className={classes.link} activeClassName={classes.linkActive} exact to="/course-registration">Course registration</NavLink>
              <NavLink className={classes.link} activeClassName={classes.linkActive} exact to="/manage-locations">Manage locations</NavLink>
            </Box>
            <Box>
              <NavLink className={classes.link} activeClassName={classes.linkActive} exact to="/login">Login</NavLink>
              <NavLink className={classes.link} activeClassName={classes.linkActive} exact to="/register">Register</NavLink>
              <NavLink className={classes.link} activeClassName={classes.linkActive} exact to="/forgot-password">Forgot password</NavLink>
            </Box>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;

