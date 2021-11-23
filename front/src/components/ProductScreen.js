import React, { useState, useEffect } from 'react'
import Product from './Product';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { GET } from '../api/fetch';
import { productsAPI } from '../api/api';

const ProductScreen = ({cartItems, addItem, removeItem}) => {

    const location = useLocation();
    //console.log(`props.match.params.id`, props.match.params.id)
    const id = location.state?.id

   // const  cartItemsFunc = location.data.cartItemsFunc;
    //const addItem = location.data.addItem;
    //const removeItem = location.data.removeItem;
    //const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || []);

    const [product, setProduct] = useState([]); //{ product_name: "", product_id: "", product_final_price: 0, product_suppliers: '', product_description: '' }
    const [productsInCategory, setProductsInCategory] = useState([]);

    //*loads the product by ID and gives recommendations from it's category
    const LoadProductAndSuggestions = async (id) => {
        let res = await GET(productsAPI.get_by_id, [id]) //*get product by id 
        if (!res || res.length === 0) {
            document.location.href = '/'; //* go to main page and refresh
        }
        setProduct(res[0]);
        let productSubCategory = res[0].sub_category_id; //*get the product's category id
        let res2 = await GET(productsAPI.get_by_sub_category, [productSubCategory]) //*get the item's category as suggestion
        setProductsInCategory(res2);
    }


    //*Makes sure the products and product suggestions are loaded only once the id in the address changes.
    useEffect(() => {
        LoadProductAndSuggestions(id)
        //console.log(`location`, location)
        console.log(`cartItems`, cartItems)
        console.log("product and suggestions loaded!");
        return () => {
        }
    }, [id])

    return (
        <ContainerPopup>
            <ProductContainerPopup>

                <Link className="close-popup-link" to="/">
                    <ClosePopup>X</ClosePopup>
                </Link>

                <ProductData>
                    <ProductLeftDescription>
                        <ProductBigDetail>{product.product_name}</ProductBigDetail>
                        {product.product_final_price && <ProductSmallDetail>{product.product_final_price.toFixed(2)}</ProductSmallDetail>}
                        <ProductSmallDetail>{product.product_suppliers}</ProductSmallDetail>
                        <ProductSmallDetail>{product.product_description}</ProductSmallDetail>
                        <BtnAddProduct onClick={() => addItem(product)}>הוספה לסל</BtnAddProduct>
                    </ProductLeftDescription>

                    <ProductContainerRight>
                        <AddItemIcon>
                            <Button onClick={() => addItem(product)}>+</Button>
                            {<Button onClick={() => removeItem(product)}>-</Button>}
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
    backdrop-filter: blur(1px);
    
}`

const ProductBigDetail = styled.div`{
    font-size: 1.8em;
    color: #19277f;
    text-shadow: 0px 0px 2px darkgray;
}`

const ProductSmallDetail = styled.div`{
    font-size: 1.2em;
    color: #27407f;
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
    font-size: 3rem;
    background-color: transparent;
    color: #27407f;
    cursor: pointer;
    &:hover{
        transition: 0.5s ease;
        font-size: 3.2rem;
        text-shadow: 0px 0px 4px blue;
    }
    &:active{
        transition: 0.5s ease;
        text-shadow: 0px 0px 7px blue;
    }
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
    top: 26%;
    transform: translateX(-0.5%);
    width: 100%;
    height: auto;
    height: 335px;
    display: flex;
}`

export default ProductScreen;