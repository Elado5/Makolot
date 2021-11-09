import './App.css';
import React, {useState} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './components/ProductScreen';
import PopUpRegister from './components/PopUpRegister';
import PopUpLogin from './components/PopUpLogin';
import ForgotPass from './components/ForgotPass';
import PaymentScreen from './screens/PaymentScreen';

function App() {

  const [products, setProducts] = useState([]);

  return (
    <BrowserRouter>
      <Route path="/forgot" component={ForgotPass}></Route>
      <Route path="/register" component={PopUpRegister}></Route>
      <Route path="/login" component={PopUpLogin}></Route>
      <Route path="/product/:id" component={ProductScreen}></Route>
      <Route path="/payment" component={PaymentScreen}></Route>
      <HomeScreen path="/" exact  products={products} setProducts={setProducts}></HomeScreen>
    </BrowserRouter>
  );
}

export default App;
