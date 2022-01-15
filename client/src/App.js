import 'bootstrap/dist/css/bootstrap.css';
import{BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import FileInput from "./components/FileInput";
import Landing from './components/Landing';
import NavBar from "./components/NavBar";
import TranPage from "./components/TranPage";

//redux
import {Provider} from "react-redux";
import store from './store'

function App() {
  return (
      <>
          <Provider store={store}>
              <Router>
                  <NavBar/>
                  <Switch>
                      <Route exact path='/' component={Landing}/>
                      <Route exact path='/tran' component={TranPage}/>
                  </Switch>
              </Router>
          </Provider>
      </>

  );
}

export default App;
