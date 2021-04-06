import { useState } from 'react';
import Button from '../../components/Button'

const CounterPage = () => {
  const [counter, setCounter] = useState(5);

  const incCounter = () => setCounter(counter + 1);
  const decCounter = () => setCounter(counter - 1);

  return (
    <div>
      <h1>Counter Page</h1>
      <h2>{counter}</h2>
      <div>
        <Button handleClick={incCounter}>Increase</Button>
        <Button handleClick={decCounter}>Decrease</Button>
      </div>
    </div>
  );
}

export default CounterPage;