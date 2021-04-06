import { useState } from 'react';
import {Typography, Button} from '@material-ui/core/'

const CounterPage = () => {
  const [counter, setCounter] = useState(5);

  const incCounter = () => setCounter(counter + 1);
  const decCounter = () => setCounter(counter - 1);

  return (
    <div>
      <Typography variant="h3" component="h1">Counter Page</Typography>
      <Typography variant="h3" component="h2">{counter}</Typography>
      <div>
        <Button handleClick={incCounter} variant="contained" color="primary">Increase</Button>
        <Button handleClick={decCounter} variant="contained" color="primary">Decrease</Button>
      </div>
    </div>
  );
}

export default CounterPage;