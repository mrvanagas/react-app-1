import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import CounterPage from './pages/CounterPage'
import CalculatorPage from './pages/CalculatorPage'
import HomePage from './pages/HomePage'


const App = () => {
  
  return (
    // <div>
    //   <CounterPage />
    //   <CalculatorPage />
    // </div>

    <Router>
    
      <Switch>
        <Route path="/counter">
          <CounterPage />
        </Route>
        <Route path="/calculator">
          <CalculatorPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    
  </Router>
  );
}

export default App;
