import React, { useEffect } from 'react'
import Product from './Product';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SplashLoading from './SplashLoading';
import MessageBox from './MessageBox';
import { productDetails } from '../actionsRedux/productActionRedux';
import data from '../data';

const ProductScreen = (props) => {
    const productInfo = useSelector((state) => state.productInfo);
    const { loading, error, product } = productInfo;
    const product_id = props.match.params.id;
    const { cartItems, addItem, removeItem } = props;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productDetails(product_id));
    }, [dispatch, product_id]);

    return (
        <div>
            {loading ? (<SplashLoading></SplashLoading>) : error ? (<MessageBox variant="danger">{error}</MessageBox>) : (
                <div>
                    <div className="container-popup" >
                        <div className="product-container-popup">

                            <Link className="close-popup-link" to="/"> 
                            <button className="close-popup">X</button>
                            </Link>

                            <div className="product-data">
                                <div className="product-left-description">
                                    <div>{product.product_name}</div>
                                    <div>{product.product_price.toFixed(2)}</div>
                                    <span>מאפיינים</span>
                                    <div>{product.product_description}</div>
                                    <button className="btn-add-product">הוספה לסל</button>
                                </div>

                                <div className="product-right-cont">
                                    <span className="add-item-icon">
                                        <button onClick={() => addItem(product)} className="button-add">+</button>
                                        <button onClick={() => removeItem(product)} className="button-remove">-</button>
                                    </span>
                                    <img className="product-item-image" src={product.product_image} alt={product.product_name} />
                                </div>
                            </div>

                            <hr />
                            <div className="product-popular ">
                                <div className="title-slider">מוצרים דומים</div>
                                <div className="product-slider">
                                    <div className="carousel-wrapper">
                                        <div data-flickity className="carousel">
                                            {data.products.map((product, key) => (
                                                <Product className="carousel-cell" key={key} product={product} cartItems={cartItems} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div >
                </div>
                )
            }
        </div >
    )
}
export default ProductScreen;