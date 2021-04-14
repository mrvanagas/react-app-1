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
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPW from './pages/ForgotPWPage'

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
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/register">
          <RegisterPage />
        </Route>
        <Route exact path="/forgotpw">
          <ForgotPW />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

