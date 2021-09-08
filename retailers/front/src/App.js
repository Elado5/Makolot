import './App.css';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './components/ProductScreen';
import PopUpRegister from './components/PopUpRegister';
import PopUpLogin from './components/PopUpLogin';

function App() {

  return (
    <BrowserRouter>
      <Route path="/register/" component={PopUpRegister}></Route>
      <Route path="/login/" component={PopUpLogin}></Route>
      <Route path="/product/:id" component={ProductScreen}></Route>
      <HomeScreen path="/" exact ></HomeScreen>
    </BrowserRouter>
  );
}
export default App;