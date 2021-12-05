import React from 'react';
import styled from 'styled-components';
import { Link, Redirect, useLocation } from 'react-router-dom';
import Shop from './Shop';
import { BeatLoader } from 'react-spinners';
import Carousel from "react-elastic-carousel";


const PopUpShops = () => {

    const location = useLocation();
    let shop = location?.state?.shops[0]
    let shops = location?.state?.shops
    console.log(shop)
    if (shops.length === 0) {

        return (<Redirect to="/" />)
    }

    console.log(`shops`, shops)

    return (
        <ContainerPopup>
            <ProductContainerPopup>

                <Link className="close-popup-link" to="/">
                    <ClosePopup>X</ClosePopup>
                </Link>
                <TitleSlider> חנויות שנמצאו</TitleSlider>
                <HrLine />
                <div className="product-slider">
                    <CarouselWrapper>
                        <Carousel itemsToShow="3" itemsToScroll="1">
                            {shops.length > 0 && shops.map((shop, key) => (
                                <Shop shop={shop} key={key} />
                            ))}
                        </Carousel>
                        <Loader>
                            {shops.length === 0 && <BeatLoader color='navy' loading />}
                        </Loader>
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
    height: 48em;
    width: 75%;
    display: flex;
    border-radius: 40px;
    align-self: center;
    flex-direction: column;
    justify-content: space-around;
    position: relative;
}`

const ClosePopup = styled.button`{
    border: none;
    border-radius: 50%;
    height: 2em;
    width: 2em;
    cursor: pointer;
    margin-left: 3%;
    margin-bottom: -1%;
}`

const HrLine = styled.hr`{
    width: 85%;
}`

const TitleSlider = styled.div`{
    display: flex;
    justify-content: center;
    font-size: 5.3rem;
    color: #27407f;
    text-shadow: 0px 0px 3px darkgray;
    font-weight: 500;
}`

const CarouselWrapper = styled.div`{
    height: 40vh;
    background-color: #ffffff;
    box-shadow: 0px;
    border-radius: 19px;
}`

const Loader = styled.div`{
    display: flex;
    justify-content: center;
    height: 1rem;
    width: 100%;
    z-index: 2;
    margin-bottom: 2px;
}`

export default PopUpShops;