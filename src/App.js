import { BrowserRouter as Router, Route, Switch }from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { createBrowserHistory } from 'history';
import Home from './components/Home';
import './App.css';

const customHistory = createBrowserHistory();

const useStyles = makeStyles((theme) => ({
  app: {}
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <Router history={customHistory}>
        <Switch>
          <Route exact path="/">
              <Home />
            </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
