import React, { useEffect, useState } from 'react'
// import data from '../data.json';
import Product from '../components/Product'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar';
import Main from '../components/Main';
import Category from '../components/Category';
import SortingPanel from '../components/SortingPanel';
import Carousel from "react-elastic-carousel";
import styled from 'styled-components';
import { GET } from '../api/fetch';
import { productsAPI } from '../api/api';
import { BeatLoader } from 'react-spinners';

const HomeScreen = ({ cartItems, setCartItems, addItem, removeItem, completelyRemoveItem, loggedUser, loggedAdmin }) => {
    //*States
    const [allProductsLoaded, setAllProductsLoaded] = useState(false);
    const [discountedProductsLoaded, setDiscountedProductsLoaded] = useState(false);
    const [products, setProducts] = useState([]);
    const [discountedProducts, setDiscountedProducts] = useState([]);

    let windowSize = window.matchMedia("(min-width: 1080px)");
    let windowRatio = window.devicePixelRatio;

    //* Funcs
    const loadProducts = async () => {
        setProducts([]);
        let res = await GET(productsAPI.get_active_products);
        setProducts(res);
    }

    const loadDiscountedProducts = async () => {
        let res = await GET(productsAPI.get_all_active_discounted)
        setDiscountedProducts(res);
    }

    //* UseEffects

    //Making sure the 'products' state is loaded ONCE.
    useEffect(() => {
        if (!allProductsLoaded) {
            loadProducts();
            setAllProductsLoaded(true);
        }
        else {
            console.log('windowRatio', windowRatio);
            console.log("Homescreen products loaded!");
        }

        // set items in local storage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [allProductsLoaded, cartItems])

    //Making sure the 'discountedProducts' state is loaded ONCE.
    useEffect(() => {
        if (!discountedProductsLoaded) {
            loadDiscountedProducts();
            setDiscountedProductsLoaded(true);

        }
        else {
            console.log("Discounted Homescreen products loaded!");
        }
    }, [discountedProductsLoaded])

    useEffect(() => {
    }, [])

    return (
        <div>
            <NavBarMediaController>
                <Navbar addItem={addItem} removeItem={removeItem} completelyRemoveItem={completelyRemoveItem} cartItems={cartItems} products={products} setProducts={setProducts}> loggedUser={loggedUser} loggedAdmin={loggedAdmin}</Navbar>
            </NavBarMediaController>
            <Main />
            <SalesSlider>
                <TitleSlider>?????????????? ????????</TitleSlider>
                <Loader>
                    {discountedProducts.length === 0 && <BeatLoader color='navy' loading />}
                </Loader>
                <ArticleSlider>
                    <CarouselWrapper>
                        { (windowRatio <=1 && windowSize.matches) &&
                            <Carousel itemsToShow={5} itemsToScroll={5}>
                                {discountedProducts.length > 0 && discountedProducts.map((product, key) => (
                                    <Product addItem={addItem} removeItem={removeItem} cartItems={cartItems} key={key} product={product} cartItemsFunc={setCartItems}></Product>
                                ))}
                            </Carousel>
                        }
                        {(windowRatio >1 || !windowSize.matches) &&
                            <Carousel itemsToShow={1} itemsToScroll={1}>
                                {discountedProducts.length > 0 && discountedProducts.map((product, key) => (
                                    <Product addItem={addItem} removeItem={removeItem} cartItems={cartItems} key={key} product={product} cartItemsFunc={setCartItems}></Product>
                                ))}
                            </Carousel>
                        }
                    </CarouselWrapper>
                </ArticleSlider>
            </SalesSlider>

            <ProductsArea>
                <SortingPanel products={products} setProducts={setProducts} />
                <ProductsManage>
                    <ProductsManageAreas>
                        <Loader>
                            {products.length === 0 && <BeatLoader color='navy' size='24' loading />}
                        </Loader>
                        <MainProducts>
                            {products.length > 0 && products.map((product, key) => (
                                <Product addItem={addItem} removeItem={removeItem} key={key} product={product} cartItems={cartItems} cartItemsFunc={setCartItems} />
                            ))}
                        </MainProducts>

                        <SalesSlider>
                            <TitleSlider>???????????? ??????????????</TitleSlider>
                            <Loader>
                                {products.length === 0 && <BeatLoader color='navy' loading />}
                            </Loader>
                            <ArticleSlider>
                                <CarouselWrapper>
                                {(windowRatio <=1 && windowSize.matches) &&
                                    <Carousel itemsToShow={3} >
                                        {products.length > 0 && products.map((product, key) => (
                                            <Product addItem={addItem} removeItem={removeItem} key={key} product={product} cartItems={cartItems} cartItemsFunc={setCartItems} />
                                        ))}
                                    </Carousel>
                                }
                                {(windowRatio >1 || !windowSize.matches) &&
                                    <Carousel itemsToShow={1} >
                                        {products.length > 0 && products.map((product, key) => (
                                            <Product addItem={addItem} removeItem={removeItem} key={key} product={product} cartItems={cartItems} cartItemsFunc={setCartItems} />
                                        ))}
                                    </Carousel>
                                }
                                </CarouselWrapper>
                            </ArticleSlider>
                        </SalesSlider>
                    </ProductsManageAreas>

                    <Category setProductsState={setProducts} loadProducts={loadProducts} />

                </ProductsManage>
            </ProductsArea>
            <Footer />
        </div>
    )
}

const MainProducts = styled.div`{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    background-color: #fafafa;
    overflow-y: scroll;
    height: 83em;
    grid-auto-flow: dense;
    direction: rtl;
}`

const SalesSlider = styled.div`{
    background-color: #fafafa;
    padding-top: 6rem;
    width:100%;
    z-index: 1;
    @media (max-width: 1080px) {
        width:110vh;
    }
}`

const TitleSlider = styled.div`{
    display: flex;
    justify-content: flex-end;
    font-size: 2.3rem;
    color: #27407f;
    font-weight: 500;
    margin-right: 30px;
    background-color: #fafafa;

}`

const ProductsArea = styled.div`{
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fafafa;
    @media (max-width: 768px) {
        width:100vh;
    }
}`

const ProductsManage = styled.div`{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #fafafa;
    width: 95%;
}`

const ProductCard = styled.div`{
    margin: 1.5em;
    height: 20em;
    width: 25em;
}`

const ArticleSlider = styled.div`{
    display: flex;
    flex-direction: row;
    position: relative;
    width: 100%;
    ${ProductCard}{
        margin: 1.5rem;
        height: 20rem;
        width: 25rem;
    }
}`

const CarouselWrapper = styled.div`{
    position: relative;
    width: 95%;
    height: 42vh;
    left: 50%;
    transform: translate(-50%, 0%);
    background-color: #fafafa;
}`
/*
const Carousel = styled.div`{
    display: flex;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    height: auto;
    height: 335px;
}`
*/
const ProductsManageAreas = styled.div`{
    display:flex;
    flex-direction: column;
    width: 100%;
}`

const Loader = styled.div`{
    display: flex;
    justify-content: center;
    height: 1rem;
    width: 100%;
    z-index: 2;
    margin-bottom: 2px;
}`

const NavBarMediaController = styled.div`{
    @media (max-width 1080px) {
    width: max-content !important;
    };
}`

export default HomeScreen;