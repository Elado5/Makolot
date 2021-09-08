import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { productsReducer, productDetailsReducer, shoppingCartReducer } from './reducersRedux/productReducersRedux';

const initialState = {};
const reducer = combineReducers({
    productsItems: productsReducer,
    productInfo: productDetailsReducer,
    shoppingCart: shoppingCartReducer
});

const composeInfo = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeInfo(applyMiddleware(thunk)));
export default store;