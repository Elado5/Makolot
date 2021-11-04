import React, { useState } from 'react'
import Product from './Product';
import { Link } from 'react-router-dom';
import data from '../data.json';
import styled from 'styled-components';

const ProductScreen = (props) => {
    const [cartItems, setCartItems] = useState([]);
    const product = data.products.find((item) => item.product_id === props.match.params.id);

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
        <ContainerPopup >
            <ProductContainerPopup>

                <Link className="close-popup-link" to="/">
                    <ClosePopup>X</ClosePopup>
                </Link>

                <ProductData>
                    <ProductLeftDescription>
                        <div>{product.product_name}</div>
                        <div>{product.product_price.toFixed(2)}</div>
                        <span>מאפיינים</span>
                        <div>{product.product_description}</div>
                        <BtnAddProduct>הוספה לסל</BtnAddProduct>
                    </ProductLeftDescription>

                    <ProductContainerRight>
                        <AddItemIcon>
                            <Button onClick={() => addItem(product)}>+</Button>
                            <Button onClick={() => removeItem(product)}>-</Button>
                        </AddItemIcon>
                        <ProductItemImage src={product.product_image} alt={product.product_name} />
                    </ProductContainerRight>
                </ProductData>

                <HrLine />
                    <TitleSlider>מוצרים דומים</TitleSlider>
                    <div className="product-slider">
                        <CarouselWrapper>
                            <Carousel data-flickity>
                                {data.products.map((product, key) => (
                                    <Product addItem={addItem} removeItem={removeItem} cartItems={cartItems} key={key} product={product}/>
                                ))}
                            </Carousel>
                        </CarouselWrapper>
                    </div>
  
            </ProductContainerPopup>
        </ContainerPopup >
    )
}

const ContainerPopup = styled.div`{
    position: fixed;
    z-index: 3;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}`

const ProductContainerPopup = styled.div`{
    background-color: #ffffff;
    height: 52em;
    width: 55%;
    display: flex;
    border-radius: 40px;
    display: flex;
    align-self: center;
    flex-direction: column;
    justify-content: space-evenly;
    position: relative;
}`

const ClosePopup = styled.button`{
    border: none;
    border-radius: 50%;
    height: 2em;
    width: 2em;
}`

const ProductData = styled.div`{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}`

const ProductLeftDescription = styled.div`{
    display: flex;
    flex-direction: column;
    width: 40%;
    text-align: right;
    align-items: flex-end;
    justify-content: space-around;
    height: 100%;
}`

const BtnAddProduct = styled.button`{
    background-color: #27407f;
    color: aliceblue;
    border: none;
    border-radius: 25px;
    height: 2.5em;
    width: 10em;
    font-family: system-ui;
    cursor: pointer;
}`

const ProductContainerRight = styled.div`{

}`

const AddItemIcon = styled.div`{
    display: flex;
    flex-direction: row;
    font-size: xx-large;
    color: #27407f;
    cursor: pointer;
    position: absolute;
    left: 13px;
}`

const Button = styled.button`{
    border: none;
    background-color: transparent;
    color: #27407f;
}`

const ProductItemImage = styled.img`{
    height: 20em;
}`

const HrLine = styled.hr`{
    width: 85%;
}`

const TitleSlider = styled.div`{
    display: flex;
    justify-content: flex-end;
    font-size: 35px;
    color: #27407f;
    font-weight: 500;
    margin-right: 30px;
}`

const CarouselWrapper = styled.div`{
    height: 30vh;
  background-color: #ffffff;
  box-shadow: 0px;
  border-radius: 19px;
}`

const Carousel = styled.div`{
    top: 56%;
    transform: translateY(-50%);
    width: 100%;
    height: auto;
    height: 335px;
}`

export default ProductScreen;