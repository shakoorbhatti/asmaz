import React from 'react';
import {Switch,Route} from 'react-router-dom';
//import {Logo} from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar'; 
import ProductList from './Components/ProductList';
import Details from './Components/Details';
import Cart from './Components/Cart/Cart';
import Default from './Components/Default';
import Model from './Components/Model';
function App() {
  return (
    <React.Fragment>
      <Navbar></Navbar>
      <Switch>
        <Route exact path="/" component={ProductList}
        ></Route>
        <Route path="/Details" component={Details}
        ></Route>
        <Route path="/Cart" component={Cart}
        ></Route>
        <Route component={Default}
        ></Route>
      </Switch>
      <Model/>
    </React.Fragment>
  );
}

export default App;
