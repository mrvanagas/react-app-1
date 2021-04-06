import {useState} from 'react'

function App() {
  const [counter, setCounter] = useState(5);

  return (
    <div>
     <h1>{counter}</h1>
    </div>
  );
}

export default App;
