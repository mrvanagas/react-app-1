import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getAuthRole } from './features/auth/selectors';

import Navbar from './components/Navbar';
import CounterPage from './pages/CounterPage';
import CalculatorPage from './pages/CalculatorPage';
import MaterialUIPage from './pages/MaterialUIPage';
import HomePage from './pages/HomePage';
import CourseRegistrationPage from './pages/CourseRegistrationPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LocationPage from './pages/LocationPage';

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector(getAuthRole);

  useEffect(() => {
    // dispatch(authenticate);
  }, []);

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
        <Route exact path="/course-registration">
          <CourseRegistrationPage />
        </Route>
        <Route exact path="/manage-locations">
          {role === 'STUDENT' ? <LocationPage /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/register">
          <RegisterPage />
        </Route>
        <Route exact path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
