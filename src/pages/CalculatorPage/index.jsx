import { makeStyles } from '@material-ui/core';
import CalculatorScreen from './CalculatorScreen';
import CalculatorButton from './CalculatorButton';

const useStyles = makeStyles(theme => {
  return {
    root: {
      margin: '3rem auto',
      width: '400px',
      padding: '1rem',
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[10]
    },
    btnGrid: {
      display: 'grid',
      marginTop: '1rem',
      height: '450px',
      width: '100%',
      gap: '.75rem',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gridTemplateRows: 'repeat(5, 1fr)'
    }
  }
});

const CalculatorPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CalculatorScreen />
      <div className={classes.btnGrid}>
        <CalculatorButton>C</CalculatorButton>
        <CalculatorButton>←</CalculatorButton>
        <CalculatorButton>÷</CalculatorButton>
        <CalculatorButton>⨉</CalculatorButton>
        <CalculatorButton>7</CalculatorButton>
        <CalculatorButton>8</CalculatorButton>
        <CalculatorButton>9</CalculatorButton>
        <CalculatorButton>—</CalculatorButton>
        <CalculatorButton>4</CalculatorButton>
        <CalculatorButton>5</CalculatorButton>
        <CalculatorButton>6</CalculatorButton>
        <CalculatorButton ySpan="2">+</CalculatorButton>
        <CalculatorButton>1</CalculatorButton>
        <CalculatorButton>2</CalculatorButton>
        <CalculatorButton>3</CalculatorButton>
        <CalculatorButton xSpan="2">0</CalculatorButton>
        <CalculatorButton>.</CalculatorButton>
        <CalculatorButton>=</CalculatorButton>
      </div>

    </div>
  )
}

export default CalculatorPage;