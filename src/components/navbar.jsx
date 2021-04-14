import React from 'react';
import { AppBar, Toolbar, Container, makeStyles } from '@material-ui/core';
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
          <NavLink className={classes.link} activeClassName={classes.linkActive} exact to="/">Home</NavLink>
          <NavLink className={classes.link} activeClassName={classes.linkActive} exact to="/counter">Counter</NavLink>
          <NavLink className={classes.link} activeClassName={classes.linkActive} exact to="/calculator">Calculator</NavLink>
          <NavLink className={classes.link} activeClassName={classes.linkActive} exact to="/material-ui">Material-ui</NavLink>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;

