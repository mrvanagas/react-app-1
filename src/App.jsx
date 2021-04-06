import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import CounterPage from './pages/CounterPage'
import CalculatorPage from './pages/CalculatorPage'
import HomePage from './pages/HomePage'
import {
Typography,
Container
} from '@material-ui/core/'

const App = () => {

  return (
    // <div>
    //   <CounterPage />
    //   <CalculatorPage />
    // </div>

    <Router>
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
