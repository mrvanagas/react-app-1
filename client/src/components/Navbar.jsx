import React, { useState } from 'react';
import { AppBar, Toolbar, Container, makeStyles, Box, Button, Menu, MenuItem, Typography } from '@material-ui/core';
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import { getAuthRole, getAuthUserEmail } from '../features/auth/selectors';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.dark
  },
  link: {
    color: theme.palette.grey[100],
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
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const email = useSelector(getAuthUserEmail);
  const role = useSelector(getAuthRole);
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.root}>
      <Container>
        <Toolbar disableGutters>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Box display="flex" alignItems="center">
              <NavLink className={classes.link} activeClassName={classes.linkActive} exact to="/">Home</NavLink>
              <NavLink className={classes.link} activeClassName={classes.linkActive} exact to="/counter">Counter</NavLink>
              <NavLink className={classes.link} activeClassName={classes.linkActive} exact to="/calculator">Calculator</NavLink>
              <NavLink className={classes.link} activeClassName={classes.linkActive} exact to="/material-ui">Material-ui</NavLink>
              <NavLink className={classes.link} activeClassName={classes.linkActive} exact to="/course-registration">Course registration</NavLink>
              {
                role !== null
                  ?
                  <>
                    <NavLink className={classes.link} activeClassName={classes.linkActive} exact to="/manage-locations">Manage locations</NavLink>
                  </>
                  : null
              }
            </Box>
            <Box position="relative">
              {
                role === null
                  ?
                  <>
                    <NavLink className={classes.link} activeClassName={classes.linkActive} exact to="/login">Login</NavLink>
                    <NavLink className={classes.link} activeClassName={classes.linkActive} exact to="/register">Register</NavLink>
                  </>
                  :
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                    >
                      {email}
                    </Button>
                    <Menu
                      id="user-menu"
                      keepMounted
                      open={userMenuOpen}
                      onClose={() => setUserMenuOpen(false)}
                    >
                      <MenuItem onClick={() => setUserMenuOpen(false)}>Profile</MenuItem>
                      <MenuItem onClick={() => setUserMenuOpen(false)}>My account</MenuItem>
                      <MenuItem onClick={() => setUserMenuOpen(false)}>Logout</MenuItem>
                    </Menu>
                  </>
              }
            </Box>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;