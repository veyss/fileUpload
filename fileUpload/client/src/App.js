import React from 'react';
import newProduct from "./page/newProduct"
import { Switch, Route } from "react-router-dom"
import './App.css';

const App = () => (
  <div className='container mt-4'>

    <Switch>
      <Route exact path='/' component={newProduct}></Route>     

    </Switch>

  </div>
);

export default App;