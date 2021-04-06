import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Navbar from './components/navbar'
import CounterPage from './pages/CounterPage'
import CalculatorPage from './pages/CalculatorPage'
import HomePage from './pages/HomePage'
import {
Typography,
Container
} from '@material-ui/core/'

const App = () => {

  return (
    <Router>
      <Navbar />
      <Container>
        <Typography align="center">
          <Switch>
            <Route exact path="/counter">
              <CounterPage />
            </Route>
            <Route exact path="/calculator">
              <CalculatorPage />
            </Route>
            <Route exact path="/">
              <HomePage />
            </Route>
          </Switch>
        </Typography>
      </Container>
    </Router>
  );
}

export default App;
