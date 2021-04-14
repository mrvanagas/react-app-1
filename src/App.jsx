import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Navbar from './components/Navbar';
import CounterPage from './pages/CounterPage';
import CalculatorPage from './pages/CalculatorPage';
import MaterialUIPage from './pages/MaterialUIPage';
import HomePage from './pages/HomePage';

const App = () => {

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/counter">
          <CounterPage />
        </Route>
        <Route exact path="/calculator">
          <CalculatorPage />
        </Route>
        <Route exact path="/material-ui">
          <MaterialUIPage />
        </Route>
        <Route exact path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

