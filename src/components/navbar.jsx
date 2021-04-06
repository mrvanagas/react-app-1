import React from 'react';
import{ AppBar, Toolbar, Container, makeStyles} from '@material-ui/core'
import {Link} from 'react-router-dom';

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
        }
    }
});

const Navbar = () => {
    const classes = useStyles();

  return (
      <AppBar position="static">
        <Toolbar>
            <Container>
                <Link className={classes.link} to="/" >Home Page</Link>
                <Link className={classes.link} to="/counter" >Counter Page</Link>
                <Link className={classes.link} to="/calculator" >Calculator Page</Link>
            </Container>
        </Toolbar>
      </AppBar>
  );
}

export default Navbar