import {useState} from 'react'

function App() {
  const [counter, setCounter] = useState(5);

  return (
    <div>
     <h1>{counter}</h1>
     <div>
       <button onClick={() => setCounter(counter +1)}>increase</button>
       <button onClick={() => setCounter(counter -1)}>decrease</button>
     </div>
    </div>
  );
}

export default App;
