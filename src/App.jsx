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
        </Typography>
      </Container>
    </Router>
  );
}

export default App;
