import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto',
    width: '100%',
    height: '50px',
    lineHeight: '50px',
    textAlign: 'right',
    paddingRight: '1rem',
    fontWeight: '600',
    fontSize: '1.5rem',
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main
  }

}));

const CalculatorScreen = () => {

  const classes = useStyles();
  return (
    <div className={classes.root}>
      
    </div>
  )
}

export default CalculatorScreen