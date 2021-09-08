import { PRODUCT_REQUEST, PRODUCT_SUCCESS, PRODUCT_ERROR, PRODUCT_DATA_REQUEST, PRODUCT_DATA_SUCCESS, PRODUCT_DATA_ERROR, ADD_ITEM_TO_CART } from '../const/constants'
import Axios from 'axios';

export const productsData = () => async (dispatch) => {
    dispatch({
        type: PRODUCT_REQUEST
    });

    try {
        const { data } = await Axios.get('/api/products');
        dispatch({ type: PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PRODUCT_ERROR, payload: error.message });
    }
};

export const productDetails = (product_id) => async (dispatch) => {
    dispatch({ type: PRODUCT_DATA_REQUEST, payload: product_id });

    try {
        const { data } = await Axios.get(`/api/products/${product_id}`);
        dispatch({ type: PRODUCT_DATA_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PRODUCT_DATA_ERROR,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const addItemToCart = (product_id, qty) => async (dispatch, getState) => {
    const { data } = await Axios.get(`/api/products/${product_id}`);

    dispatch({
        type : ADD_ITEM_TO_CART,
        payload:{
            product: data.product_id,
            category_id: data.category_id,
            product_name: data.product_name,
            product_price: data.product_price,
            product_details: data.product_details,
            product_description: data.product_description,
            product_image: data.product_image,
            product_suppliers: data.product_suppliers,
            qty,
        }
    });
};