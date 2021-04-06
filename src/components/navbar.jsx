import React from 'react';
import{ AppBar, Toolbar, Container, makeStyles} from '@material-ui/core'
import {NavLink} from 'react-router-dom';

const useStyles = makeStyles(theme => {
    return {
        link: {
            color: theme.palette.primary.contrastText,
            textDecoration: 'none',
            fontSize: '1.25rem',
            marginRight: '1rem',
            '&:hover' :{
                color: '#ccc'
            }
        },
        linkActive: {
            textDecoration: 'underline'
        }
    }
});

const Navbar = () => {
    const classes = useStyles();

  return (
      <AppBar position="static">
        <Toolbar>
            <Container>
                <NavLink exact className={classes.link} activeClassName={classes.linkActive} to="/" >Home Page</NavLink>
                <NavLink exact className={classes.link} activeClassName={classes.linkActive} to="/counter" >Counter Page</NavLink>
                <NavLink exact className={classes.link} activeClassName={classes.linkActive} to="/calculator" >Calculator Page</NavLink>
            </Container>
        </Toolbar>
      </AppBar>
  );
}

export default Navbar