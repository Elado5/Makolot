import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import UserScreen from './screens/UserScreen';
import ProductScreen from './components/ProductScreen';
import PopUpRegister from './components/PopUpRegister';
import PopUpLogin from './components/PopUpLogin';
import ForgotPass from './components/ForgotPass';
import PaymentScreen from './screens/PaymentScreen';
import PopUpAddressRegister from './components/PopUpAddressRegister';
import UserUpdate from './screens/UserUpdate';
import UserOrders from './screens/UserOrders';
import UserOrderDetails from './screens/UserOrderDetails';
import PaymentSuccessScreen from './screens/PaymentSuccessScreen';
import MapScreen from './screens/MapScreen';
import AboutScreen from './screens/AboutScreen';
import AdminHomeScreen from './screens/AdminHomeScreen';
import PopUpShops from './components/PopUpShops';
import AdminLogin from './components/admin/PopUpAdminLogin';
import AdminProducts from './components/admin/AdminProducts';
import AdminProductAdd from './components/admin/AdminProductAdd';
import AdminProductUpdate from './components/admin/AdminProductUpdate';
import AdminProductImageScreen from './components/admin/AdminProductImageScreen';
import AdminCustomers from './components/admin/AdminCustomers';
import AdminRetailers from './components/admin/AdminRetailers';
import AdminShops from './components/admin/AdminShops';
import AdminOrders from './components/admin/AdminOrders';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import AdminRetailerUpdate from './components/admin/AdminRetailerUpdate';
import AdminShopsUpdate from './components/admin/AdminShopsUpdate';

library.add(fab, faPhone);

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
        <Route path="/userPage" component={UserScreen}></Route>
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
      <Route path="/adminPage/products/add" component={AdminProductAdd}></Route>

      <Route path="/adminPage/product/:id" component={AdminProductUpdate}>
      </Route>
      <Route path="/adminPage/product/:id/image" component={AdminProductImageScreen}/>
      <Route path="/adminPage/customers" component={AdminCustomers}/>
      <Route path="/adminPage/retailers" component={AdminRetailers}/>
      <Route path="/adminPage/retailers/:id" component={AdminRetailerUpdate}/>
      <Route path="/adminPage/shops" component={AdminShops}/>
      <Route path="/adminPage/shops/:id" component={AdminShopsUpdate}/>
      <Route path="/adminPage/orders" component={AdminOrders}/>
      <Route path="/UserPage/update" component={UserUpdate}/>
      <Route path="/UserPage/orders" component={UserOrders}/>
      <Route path="/UserPage/orderDetails" component={UserOrderDetails}/>
      <Route path="/about" component={AboutScreen}/>
      <Route path="/map" component={MapScreen}/>
      <Route path="/paymentsuccess" component={PaymentSuccessScreen}/>
      <Route path="/payment/registerAddress" component={PopUpAddressRegister}/>
      <Route path="/forgot" component={ForgotPass}/>
      <Route path="/register" component={PopUpRegister}/>
      <Route path="/login" component={PopUpLogin}/>
      <Route path="/shopsSearch" component={PopUpShops}/>
      <Route path="/product/:id" render={() =>
        (<ProductScreen cartItems={cartItems} setCartItems={setCartItems} addItem={addItem} removeItem={removeItem} />)}>
      </Route>


    </BrowserRouter>
  );
}

export default App;
