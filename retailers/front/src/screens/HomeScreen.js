import React, { useEffect, useState } from 'react'
import data from '../data.js';
import Product from '../components/Product'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar';
import Main from '../components/Main';
import Category from '../components/Category';
import SortingPanel from '../components/SortingPanel';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, productsData } from '../actionsRedux/productActionRedux';

import SplashLoading from '../components/SplashLoading';
import MessageBox from '../components/MessageBox';


const HomeScreen = () => {
    const productsItems = useSelector((state) => state.productsItems)
    const { loading, error, products } = productsItems;
    const dispatch = useDispatch();
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        dispatch(productsData());
    }, [])

    const addItem = (product) => {
        const existing = cartItems.find((item) => item.product_id === product.product_id);

        if (existing) {
            setCartItems(cartItems.map((item) => item.product_id === product.product_id ?
                { ...existing, qty: existing.qty + 1 } : item));
        }
        else {
            setCartItems([...cartItems, { ...product, qty: 1 }]);
        }
        console.log(cartItems)
    }

    const removeItem = (product) => {
        const existing = cartItems.find((item) => item.product_id === product.product_id);

        if (existing.qty === 1) {
            setCartItems(cartItems.filter((item) => item.product_id !== product.product_id));
        }
        else {
            setCartItems(cartItems.map(item => item.product_id === product.product_id ?
                { ...existing, qty: existing.qty - 1 } : item));
        }
    }

    return (
        <div>
            {/* {loading ? (<SplashLoading></SplashLoading>) : error ? (<MessageBox variant="danger">{error}</MessageBox>) :
                (<div> */}
                    <Navbar counterProduct={cartItems.length} addItem={addItem} removeItem={removeItem} cartItems={cartItems}></Navbar>

                    <Main />
                    <div className="sales-slider">
                        <div className="title-slider">המבצעים שלנו</div>
                        <div className="article-slider">
                            <div className="carousel-wrapper" >
                                <div className="carousel" data-flickity >
                                    {data.products.map((product, key) => (
                                        <Product addItem={addItem} removeItem={removeItem} cartItems={cartItems} key={key} product={product} className="carousel-cell" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="products-area">
                        <SortingPanel />
                        <div className="products-manage">
                            <div className="products-manage-areas">
                                <div className="main-products">
                                    {data.products.map((product, key) => (
                                        <Product addItem={addItem} removeItem={removeItem} key={key} product={product} cartItems={cartItems}></Product>
                                    ))}
                                </div>

                                <div className="sales-slider">
                                    <div className="title-slider">מוצרים מובילים</div>
                                    <div className="article-slider">
                                        <div className="carousel-wrapper">
                                            <div className="carousel" data-flickity>
                                                {data.products.map((product, key) => (
                                                    <Product addItem={addItem} removeItem={removeItem} key={key} product={product} cartItems={cartItems} className="carousel-cell" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* <div className="manage-panel"> */}
                                <Category products={products}></Category>
                            {/* </div> */}
                        </div>
                    </div>
                    <Footer />
                </div>
        //         )}
        // </div>
    )
}
export default HomeScreen;