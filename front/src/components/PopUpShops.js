import React from 'react';
import styled from 'styled-components';
import { Link, Redirect, useLocation } from 'react-router-dom';
import Shop from './Shop';

const PopUpShops = () => {

    const location = useLocation();

    const shop = location?.state?.shops[0]
    const shops = location?.state?.shops

    if(!shop){
            //document.location.href = '/'; //* go to main page and refresh
            return (<Redirect to="/"></Redirect>);
            }

    console.log(`shops`, shops)

    return (
        <ContainerPopup>
            <ProductContainerPopup>

                <Link className="close-popup-link" to="/">
                    <ClosePopup>X</ClosePopup>
                </Link>

                <ProductData>
                    <ProductLeftDescription>
                        <ProductBigDetail>{shop.grocery_shop_name}</ProductBigDetail>
                        <ProductSmallDetail>{shop.grocery_shop_city}</ProductSmallDetail>
                        <ProductSmallDetail>{shop.grocery_shop_opening_times}</ProductSmallDetail>
                        <ProductSmallDetail>{shop.grocery_shop_phone_number}</ProductSmallDetail>
                    </ProductLeftDescription>

                </ProductData>

                <HrLine />
                <TitleSlider>עוד חנויות שנמצאו</TitleSlider>
                <div className="product-slider">
                    <CarouselWrapper>
                        <Carousel data-flickity>
                            {shops.map((shop, key) => (
                                <Shop shop={shop} key={key} />
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
export default PopUpShops;