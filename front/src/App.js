import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './components/ProductScreen';
import PopUpRegister from './components/PopUpRegister';
import PopUpLogin from './components/PopUpLogin';
import ForgotPass from './components/ForgotPass';
import PaymentScreen from './screens/PaymentScreen';
import UserDataScreen from './screens/UserDataScreen';
import PaymentSuccessScreen from './screens/PaymentSuccessScreen';
import MapScreen from './screens/MapScreen';
import AboutScreen from './screens/AboutScreen';
import AdminHomeScreen from './screens/AdminHomeScreen';

function App() {

  const [cartFromLocalStorage, setCartFromLocalStorage] = useState(JSON.parse(localStorage.getItem('cartItems')) || []);


  return (
    <BrowserRouter>
      <Route path="/admin" component={AdminHomeScreen}></Route>
      <Route path="/userdata" component={UserDataScreen}></Route>
      <Route path="/about" component={AboutScreen}></Route>
      <Route path="/map" component={MapScreen}></Route>
      <Route path="/paymentsuccess" component={PaymentSuccessScreen}></Route>
      <Route path="/forgot" component={ForgotPass}></Route>
      <Route path="/register" component={PopUpRegister}></Route>
      <Route path="/login" component={PopUpLogin}></Route>
      <Route path="/product/:id" component={ProductScreen}></Route>
      <Route path="/payment">
        <PaymentScreen cartItems={cartFromLocalStorage} setCartItems={setCartFromLocalStorage} />
      </Route>
      <HomeScreen path="/" exact cartItems={cartFromLocalStorage} setCartItems={setCartFromLocalStorage}></HomeScreen>
    </BrowserRouter>
  );
}

export default App;
