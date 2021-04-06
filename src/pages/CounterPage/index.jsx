import { useState } from 'react';
import Button from '../../components/Button'
import Typography from '@material-ui/core/Typography'

const CounterPage = () => {
  const [counter, setCounter] = useState(5);

  const incCounter = () => setCounter(counter + 1);
  const decCounter = () => setCounter(counter - 1);

  return (
    <div>
      <Typography variant="h3" component="h1">Counter Page</Typography>
      <Typography variant="h3" component="h2">{counter}</Typography>
      <div>
        <Button handleClick={incCounter}>Increase</Button>
        <Button handleClick={decCounter}>Decrease</Button>
      </div>
    </div>
  );
}

export default CounterPage;