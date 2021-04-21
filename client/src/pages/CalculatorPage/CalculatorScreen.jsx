import { makeStyles, Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto',
    width: '100%',
    height: '80px',
    textAlign: 'right',
    padding: '0.25rem 1rem',
    fontWeight: '600',
    backgroundColor: theme.palette.common.white,
  },
  fullOutput: {
    height: '30px',
    fontSize: '1.25rem',
    color: theme.palette.grey[500],
  },
  tempOutput: {
    height: '40px',
    color: theme.palette.primary.main,
    fontSize: '1.6rem',
  }
}));

const CalculatorScreen = ({ fullOutput, tempOutput }) => {

  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.fullOutput}>{fullOutput}</Box>
      <Box className={classes.tempOutput}>{tempOutput}</Box>
    </Box>
  );
}

export default CalculatorScreen
