import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Footer from './components/Footer'
import Navbar from './components/Navbar';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
