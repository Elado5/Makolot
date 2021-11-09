import React, { useEffect, useState } from 'react'
import data from '../data.json';
import Product from '../components/Product'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar';
import Main from '../components/Main';
import Category from '../components/Category';
import SortingPanel from '../components/SortingPanel';
import styled from 'styled-components';
import {GET, POST, PUT, DELETE} from '../api/fetch';
import {customersAPI, addressesAPI, categoriesAPI, sub_categoriesAPI, CACAPI, productsAPI, shopsAPI, ordersAPI} from '../api/api';

const HomeScreen = () => {
    const [cartItems, setCartItems] = useState([]);

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [productsInCategory, setProductsInCategory] = useState([]);
    const [productsInSubCategory, setProductsInSubCategory] = useState([]);
    const [productDiscount, setProductDiscount] = useState([]);


    const [addresses, setAddresses] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [creditCards, setCreditCards] = useState([]);
    const [shops, setShops] = useState([]);
    const [managers, setManagers] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [orders, setOrders] = useState([]);
    const [transactions, setTransactions] = useState([]);



    const loadCategories = async () => {
        let res = await GET(categoriesAPI.get_all);
        setCategories(res);
    }

    const loadSubCategories = async () => {
        let res = await GET(sub_categoriesAPI.get_all);
        setSubCategories(res);
    }

    const loadProducts = async () => {
        let res = await GET(productsAPI.get_all);
        setProducts(res);
    }

    const loadProductsInCategory = async (id) => {
        let res = await GET(categoriesAPI.get_by_id, [id]);
        setProductsInCategory(res);
    }

    const loadProductsInSubCategory = async (id) => {
        let res = await GET(sub_categoriesAPI.get_by_id, [id]);
        setProductsInSubCategory(res);
    }

    const loadProductDiscount = async () => {
        let res = await fetch('api/Products/byCategory/1');
        setProductDiscount(res);
    }


    const loadAddresses = async () => {
        //do we connect outer source here?
        let res = await GET(addressesAPI.get_all)
        setAddresses(res);
    }

    const loadCustomers = async () => {
        let res = await GET(customersAPI.get_all);
        setCustomers(res);
    }

    const loadCreditCards = async () => {
        let res = await fetch('api/CreditCards/all');
        setCreditCards(res);
    }

    const loadShops = async () => {
        let res = await GET(shopsAPI.get_all)
        setShops(res);
    }

    const loadManagers = async () => {
        let res = await fetch('api/Managers/all');
        setManagers(res);
    }

    const loadInvoices = async () => {
        let res = await fetch('api/Invoices/all');
        setInvoices(res);
    }

    const loadOrders = async () => {
        let res = await GET(ordersAPI.get_all)
        setOrders(res);
    }

    const loadTransactions = async () => {
        let res = await fetch('api/transactions/all');
        setTransactions(res);
    }

    useEffect(() => {
        loadCategories();
        loadProducts();
        loadAddresses();
        loadCustomers();
        loadCreditCards();
        loadShops();
        loadManagers();
        loadInvoices();
        loadOrders();
        loadTransactions();
        loadProductsInCategory(1);
        loadProductsInSubCategory(1);
        loadProductDiscount();
        loadSubCategories();
    }, [])


    const addItem = (product) => {
        const existing = cartItems.find((item) => item.product_id === product.product_id);

        if (existing) {
            setCartItems(cartItems.map((item) =>
                item.product_id === product.product_id ? { ...existing, qty: existing.qty + 1 } : item));
        }
        else {
            setCartItems([...cartItems, { ...product, qty: 1 }]);
        }
    }

    const removeItem = (product) => {
        const existing = cartItems.find((item) => item.product_id === product.product_id);

        if (existing.qty === 1) {
            setCartItems(cartItems.filter((item) => item.product_id !== product.product_id));
        }
        else {
            setCartItems(cartItems.map(item =>
                item.product_id === product.product_id ? { ...existing, qty: existing.qty - 1 } : item));
        }
    }

    return (
        <div>
            <Navbar addItem={addItem} removeItem={removeItem} cartItems={cartItems}></Navbar>
            <Main />
            <SalesSlider>
                <TitleSlider>המבצעים שלנו</TitleSlider>
                <ArticleSlider>
                    <CarouselWrapper>
                        <Carousel data-flickity >
                            {products.map((product, key) => (
                                <Product addItem={addItem} removeItem={removeItem} cartItems={cartItems} key={key} product={product} ></Product>
                            ))}
                        </Carousel>
                    </CarouselWrapper>
                </ArticleSlider>
            </SalesSlider>

            <ProductsArea>
                <SortingPanel />
                <ProductsManage>
                    <ProductsManageAreas>
                        <MainProducts>
                            {products.map((product, key) => (
                                <Product addItem={addItem} removeItem={removeItem} key={key} product={product} cartItems={cartItems} />
                            ))}
                        </MainProducts>

                        <SalesSlider>
                            <TitleSlider>מוצרים מובילים</TitleSlider>
                            <ArticleSlider>
                                <CarouselWrapper>
                                    <Carousel data-flickity>
                                        {products.map((product, key) => (
                                            <Product addItem={addItem} removeItem={removeItem} key={key} product={product} cartItems={cartItems} />
                                        ))}
                                    </Carousel>
                                </CarouselWrapper>
                            </ArticleSlider>
                        </SalesSlider>
                    </ProductsManageAreas>

                    <Category />

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
    padding-top: 10px;
    padding-bottom: 10px;
    z-index: 1;
}`

const TitleSlider = styled.div`{
    display: flex;
    justify-content: flex-end;
    font-size: 35px;
    color: #27407f;
    font-weight: 500;
    margin-right: 30px;
}`

const ProductsArea = styled.div`{
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fafafa;
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

    ${ProductCard}{
        margin: 1.5em;
        height: 20em;
        width: 25em;
    }
}`

const CarouselWrapper = styled.div`{
    position: relative;
    width: 100%;
    height: 42vh;
    left: 50%;
    transform: translate(-50%, 0%);
    background-color: #fafafa;
    overflow: hidden;
    z-index: 0;
}`

const Carousel = styled.div`{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    height: auto;
    height: 335px;
}`

const ProductsManageAreas = styled.div`{
    display:flex;
    flex-direction: column;
    width: 100%;
}`
export default HomeScreen;