import { useState, useEffect } from 'react';
import { makeStyles, Box } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles';
import CalculatorScreen from './CalculatorScreen';
import CalculatorButton from './CalculatorButton';
import {
  NUMBER,
  OPERATOR,
  EQUAL,
  DOT,
  CLEAR,
  BACKSPACE,
} from './CalculatorActionTypes';

const theme = createMuiTheme({
  palette: {
    action: {
      disabledBackground: '#6b75ad',
      disabled: '#eee'
    }
  }
});

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
const calcActions = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
};
const calcNumOpNum = (num1, operator, num2) => calcActions[operator](+num1, +num2);

const Calculator = () => {
  const classes = useStyles();
  const [fullOutput, setFullOutput] = useState('');
  const [tempOutput, setTempOutput] = useState('');
  const [tempResult, setTempResult] = useState(undefined);
  const [actions, setActions] = useState([]);
  const [dividedByZero, setDividedByZero] = useState(false);

  const handleAction = () => {
    const [action, lastAction] = actions;
    switch (action?.type) {
      case NUMBER:
        if (dividedByZero) reset();
        switch (lastAction?.type) {
          case OPERATOR:
            setTempOutput(action.payload.value);
            break;
          case NUMBER:
            setTempOutput(tempOutput + action.payload.value);
            break;
          case DOT:
            setTempOutput(tempOutput + action.payload.value);
            break;
          default:
            if (action.payload.value !== '0') setTempOutput(action.payload.value);
            else actions.splice(0, 1);
        }
        break;

      case OPERATOR:
        switch (lastAction?.type) {
          case NUMBER:
            const operatorCount = actions.reduce((count, { type }) => count += +(type === OPERATOR), 0);
            if (operatorCount > 1) {
              const actionsCopy = [...actions];
              const operator = actionsCopy.slice(1).find(({ type }) => type === OPERATOR).payload.operator;
              if (operator === '/' && tempOutput === '0') {
                handleDivisionByZero('Cannot divide by zero');
                break;
              }
              const tempVal = calcNumOpNum(tempResult, operator, tempOutput);
              setTempResult(tempVal);
              setTempOutput(tempVal);
            } else setTempResult(tempOutput);
            setFullOutput(fullOutput + tempOutput + action.payload.sign);
            break;
          case OPERATOR: {
            setFullOutput(fullOutput.slice(0, -1) + action.payload.sign);
            actions.splice(1, 1);
            break;
          }
          case DOT: {
            const operatorCount = actions.reduce((count, { type }) => count += +(type === OPERATOR), 0);
            const tempOutputBase = tempOutput.slice(0, -1);
            actions.splice(1, 1);
            if (operatorCount > 1) {
              const actionsCopy = [...actions];
              const operator = actionsCopy.slice(1).find(({ type }) => type === OPERATOR).payload.operator;
              const tempVal = calcNumOpNum(tempResult, operator, tempOutputBase);
              setTempResult(tempVal);
              setTempOutput(tempVal);
            } else setTempResult(tempOutputBase);
            setTempOutput(tempOutputBase);
            setFullOutput(fullOutput + tempOutputBase + action.payload.sign);
            break;
          }
          default:
            setFullOutput('0' + action.payload.sign);
            setTempResult('0');
            break;
        }
        break;

      case EQUAL:
        if (dividedByZero) {
          reset();
          break;
        }
        switch (lastAction?.type) {
          case NUMBER:
            if (tempResult !== undefined) {
              const operator = actions.find(({ type }) => type === OPERATOR).payload.operator;
              if (operator === '/' && tempOutput === '0') {
                handleDivisionByZero('Cannot divide by zero');
                break;
              }
              const res = calcNumOpNum(tempResult, operator, tempOutput);
              setTempOutput(res);
              setTempResult(res);
            }
            setFullOutput(fullOutput + tempOutput + '=');
            actions.splice(0, actions.length);
            break;
          case DOT:
            const tempOutputBase = tempOutput.slice(0, -1);
            setTempOutput(tempOutputBase);
            if (tempResult !== undefined) {
              const operator = actions.find(({ type }) => type === OPERATOR).payload.operator;
              if (operator === '/' && tempOutputBase === '0') {
                handleDivisionByZero('Cannot divide by zero');
                break;
              }
              const res = calcNumOpNum(tempResult, operator, tempOutputBase);
              setTempOutput(res);
              setTempResult(res);
            }
            setFullOutput(fullOutput + tempOutputBase + '=');
            actions.splice(0, actions.length);
            break;
          case OPERATOR:
            const _tempOutput = tempOutput === '' ? '0' : tempOutput;
            const operator = lastAction.payload.operator;
            if (lastAction.payload.operator === '/' && _tempOutput === '0') {
              handleDivisionByZero('Result is undefined');
              break;
            }
            const res = calcNumOpNum(tempResult, operator, _tempOutput);
            setFullOutput(fullOutput + _tempOutput + '=');
            setTempOutput(res);
            setTempResult(res);
            break;
          default: break;
        }
        break;

      case DOT:
        const tempOutputBase = [OPERATOR, EQUAL].includes(lastAction?.type) ? '' : tempOutput;
        if (tempOutputBase === '') setTempOutput('0.');
        else if (!tempOutputBase.includes('.')) setTempOutput(tempOutputBase + '.')
        else actions.splice(0, 1);
        break;

      case CLEAR:
        reset();
        setActions([]);
        break;

      case BACKSPACE:
        if (dividedByZero) {
          reset();
          break;
        }
        if ([DOT, NUMBER].includes(lastAction?.type)) {
          actions.splice(0, 2);
          setTempOutput(tempOutput.slice(0, -1));
          if (tempOutput.length === 1) setTempOutput('0');
        }
        else actions.splice(0, 1);
        break;
      default:
        setFullOutput('');
        setTempOutput('0');
    }
  }

  const handleDivisionByZero = (msg) => {
    actions.splice(0, actions.length);
    setTempOutput(msg);
    setDividedByZero(true);
  }

  const reset = () => {
    setTempOutput('0');
    setFullOutput('');
    setDividedByZero(false);
    setTempResult(undefined);
  }

  useEffect(handleAction, [actions]);

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.root}>
        <CalculatorScreen fullOutput={fullOutput} tempOutput={tempOutput} />
        <Box className={classes.btnGrid}>
          <CalculatorButton onClick={() => setActions([{ type: CLEAR }, ...actions])}>C</CalculatorButton>
          <CalculatorButton onClick={() => setActions([{ type: BACKSPACE }, ...actions])}>←</CalculatorButton>
          <CalculatorButton disabled={dividedByZero} onClick={() => setActions([{ type: OPERATOR, payload: { sign: '÷', operator: '/' } }, ...actions])}>÷</CalculatorButton>
          <CalculatorButton disabled={dividedByZero} onClick={() => setActions([{ type: OPERATOR, payload: { sign: '×', operator: '*' } }, ...actions])}>⨉</CalculatorButton>
          <CalculatorButton onClick={() => setActions([{ type: NUMBER, payload: { value: '7' } }, ...actions])}>7</CalculatorButton>
          <CalculatorButton onClick={() => setActions([{ type: NUMBER, payload: { value: '8' } }, ...actions])}>8</CalculatorButton>
          <CalculatorButton onClick={() => setActions([{ type: NUMBER, payload: { value: '9' } }, ...actions])}>9</CalculatorButton>
          <CalculatorButton disabled={dividedByZero} onClick={() => setActions([{ type: OPERATOR, payload: { sign: '-', operator: '-' } }, ...actions])}>—</CalculatorButton>
          <CalculatorButton onClick={() => setActions([{ type: NUMBER, payload: { value: '4' } }, ...actions])}>4</CalculatorButton>
          <CalculatorButton onClick={() => setActions([{ type: NUMBER, payload: { value: '5' } }, ...actions])}>5</CalculatorButton>
          <CalculatorButton onClick={() => setActions([{ type: NUMBER, payload: { value: '6' } }, ...actions])}>6</CalculatorButton>
          <CalculatorButton disabled={dividedByZero} onClick={() => setActions([{ type: OPERATOR, payload: { sign: '+', operator: '+' } }, ...actions])} ySpan="2">+</CalculatorButton>
          <CalculatorButton onClick={() => setActions([{ type: NUMBER, payload: { value: '1' } }, ...actions])}>1</CalculatorButton>
          <CalculatorButton onClick={() => setActions([{ type: NUMBER, payload: { value: '2' } }, ...actions])}>2</CalculatorButton>
          <CalculatorButton onClick={() => setActions([{ type: NUMBER, payload: { value: '3' } }, ...actions])}>3</CalculatorButton>
          <CalculatorButton onClick={() => setActions([{ type: NUMBER, payload: { value: '0' } }, ...actions])} xSpan="2">0</CalculatorButton>
          <CalculatorButton disabled={dividedByZero} onClick={() => setActions([{ type: DOT }, ...actions])}>.</CalculatorButton>
          <CalculatorButton onClick={() => setActions([{ type: EQUAL }, ...actions])}>=</CalculatorButton>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default Calculator;



