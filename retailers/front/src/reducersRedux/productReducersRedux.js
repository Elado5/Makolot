const { PRODUCT_REQUEST, PRODUCT_SUCCESS, PRODUCT_ERROR, PRODUCT_DATA_REQUEST, PRODUCT_DATA_SUCCESS, PRODUCT_DATA_ERROR, ADD_ITEM_TO_CART } = require('../const/constants');

export const productsReducer = (state = { loading: true, products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_REQUEST:
            return { loading: true };
        case PRODUCT_SUCCESS:
            return { loading: false, products: action.payload };
        case PRODUCT_ERROR:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const productDetailsReducer = (state = { product: {}, loading: true }, action) => {
    switch (action.type) {
        case PRODUCT_DATA_REQUEST:
            return { loading: true };
        case PRODUCT_DATA_SUCCESS:
            return { loading: false, product: action.payload };
        case PRODUCT_DATA_ERROR:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const shoppingCartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case ADD_ITEM_TO_CART:
            const itemData = action.payload;
            const getItemForExist = state.cartItems.find((item) => item.product === itemData.product);

            if (getItemForExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((item) => item.product === getItemForExist.product ? itemData : item)
                }
            } else {
                return { ...state, cartItems: [...state.cartItems, itemData] };
            }

        default:
            return state;
    }
}