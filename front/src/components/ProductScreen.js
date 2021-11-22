import React, { useState, useEffect } from 'react'
import Product from './Product';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GET } from '../api/fetch';
import { productsAPI } from '../api/api';

const ProductScreen = (props) => {
    const [cartItems, setCartItems] = useState([]);
    const [product, setProduct] = useState([]);
    const [productsInCategory, setProductsInCategory] = useState([]);
    
    //*loads the product by ID and gives recommendations from it's category
    const LoadProductAndSuggestions = async (id) => {
        let res = await GET(productsAPI.get_by_id, [id]) //*get product by id 
        if(res.length === 0) {
            document.location.href = '/'; //* go to main page and refresh
        }
        setProduct(res[0]);
        let productSubCategory = res[0].sub_category_id; //*get the product's category id
        let res2 = await GET(productsAPI.get_by_sub_category, [productSubCategory]) //*get the item's category as suggestion
        setProductsInCategory(res2);
    }

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

    //*Makes sure the products and product suggestions are loaded only once the id in the address changes.
    useEffect(() => {
        LoadProductAndSuggestions(props.match.params.id)
        console.log("product and suggestions loaded!");
        
        return () => {
        }
    }, [props.match.params.id])

return (
    <ContainerPopup>
        <ProductContainerPopup>

            <Link className="close-popup-link" to="/">
                <ClosePopup>X</ClosePopup>
            </Link>

            <ProductData>
                <ProductLeftDescription>
                    <div>{product.product_name}</div>
                    <div>{product.product_final_price}</div>
                    <span>{product.product_suppliers}</span>
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
                        {productsInCategory.map((product, key) => (
                            <Product addItem={addItem} removeItem={removeItem} cartItems={cartItems} key={key} product={product} />
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