import { makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles({
  root: ({ xSpan, ySpan }) => ({
    fontSize: '1.5rem',
    gridColumn: `span ${xSpan}`,
    gridRow: `span ${ySpan}`,
  }),
  disabled: {
    backgroundColor: 'red'
  }
});

const CalculatorButton = ({ children, xSpan = 1, ySpan = 1, disabled, onClick }) => {
  const classes = useStyles({ xSpan, ySpan });
  return (
    <Button
      variant="contained"
      color="primary"
      className={`${classes.root}${disabled ? ` ${classes.disabled}` : ''}`}
      disabled={disabled}
      onClick={onClick}>
      {children}
    </Button>
  )
}

export default CalculatorButton;
