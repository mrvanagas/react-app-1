import { makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles({
  root: ({ xSpan, ySpan }) => ({
    fontSize: '1.5rem',
    gridColumn: `span ${xSpan}`,
    gridRow: `span ${ySpan}`,
  })
});

const CalculatorButton = ({ children, onClick, xSpan = 1, ySpan = 1 }) => {
  const classes = useStyles({
    xSpan,
    ySpan
  });
  return (
    <Button variant="contained" color="primary" className={classes.root} onClick={onClick}>
      {children}
    </Button>
  )
}

export default CalculatorButton;