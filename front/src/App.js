import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
import PopUpShops from './components/PopUpShops';
import AdminLogin from './components/admin/PopUpAdminLogin';
import AdminProducts from './components/admin/AdminProducts';
import AdminProductScreen from './components/admin/AdminProductScreen';
import AdminCustomers from './components/admin/AdminCustomers';
import AdminRetailers from './components/admin/AdminRetailers';
import AdminShops from './components/admin/AdminShops';

function App () {

  //*State
  //Take cart items from local storage
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || []);

  //*cart item funcs
  //#region
  const addItem = (product) => {
    const existing = cartItems.find((item) => item.product_id === product.product_id);

    if (existing) {
      setCartItems(cartItems.map((item) =>
        item.product_id === product.product_id ? { ...existing, qty: existing.qty + 1 } : item));
    }
    else if (product.product_final_price) { //prevents adding unloaded product to cart
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
    else {
      return;
    }
  }

  const removeItem = (product) => {
    const existing = cartItems.find((item) => item.product_id === product.product_id);

    if (!existing) { //relevant for ProductScreen page
      return;
    }
    if (existing.qty === 1) {
      setCartItems(cartItems.filter((item) => item.product_id !== product.product_id));
    }
    else {
      setCartItems(cartItems.map(item =>
        item.product_id === product.product_id ? { ...existing, qty: existing.qty - 1 } : item));
    }
  }

  const completelyRemoveItem = (product) => {
    const existing = cartItems.find((item) => item.product_id === product.product_id);

    if (existing) {
      setCartItems(cartItems.filter((item) => item.product_id !== product.product_id));
    }
  }

  //#endregion 

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/adminPage" component={AdminHomeScreen}></Route>
        <Route exact path="/AdminLogin">
          <AdminLogin />
        </Route>
        <Route path="/payment">
        <PaymentScreen cartItems={cartItems} setCartItems={setCartItems} />
      </Route>
        <HomeScreen path="/"
            cartItems={cartItems} setCartItems={setCartItems} addItem={addItem}
            removeItem={removeItem} completelyRemoveItem={completelyRemoveItem}>
          </HomeScreen>
      </Switch>
      <Route path="/adminPage/products" component={AdminProducts}></Route>
      <Route path="/adminPage/product/:id" component={AdminProductScreen}>
      </Route>
      <Route path="/adminPage/customers" component={AdminCustomers}/>
      <Route path="/adminPage/retailers" component={AdminRetailers}/>
      <Route path="/adminPage/shops" component={AdminShops}/>
      <Route path="/userdata" component={UserDataScreen}></Route>
      <Route path="/about" component={AboutScreen}></Route>
      <Route path="/map" component={MapScreen}></Route>
      <Route path="/paymentsuccess" component={PaymentSuccessScreen}></Route>
      <Route path="/forgot" component={ForgotPass}></Route>
      <Route path="/register" component={PopUpRegister}></Route>
      <Route path="/login" component={PopUpLogin}></Route>
      <Route path="/shopsSearch" component={PopUpShops}></Route>
      <Route path="/product/:id" render={() =>
        (<ProductScreen cartItems={cartItems} setCartItems={setCartItems} addItem={addItem} removeItem={removeItem} />)}>
      </Route>


    </BrowserRouter>
  );
}

export default App;
