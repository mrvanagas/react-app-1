import {useState} from 'react'
import Button from './components/button'

function App() {
  const [counter, setCounter] = useState(5);

  return (
    <div>
     <h1>{counter}</h1>
     <div>
       <Button text="increase" onClick={() => setCounter(counter +1)} />
       <Button text="decrease" onClick={() => setCounter(counter -1)} />
     </div>
    </div>
  );
}

export default App;
