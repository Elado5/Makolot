import React from 'react'
import styled from 'styled-components';

const Basket = (props) => {

    const { counterProduct } = props;

    return (
        <BasketShop>
            <BasketIcon alt="basket" src="/images/icons8-shopping-cart-96.png"/>

            <CounterBasket>
                {counterProduct ? (<span> {counterProduct} </span>) : 0}
            </CounterBasket>
        </BasketShop>
    )
}

const BasketShop = styled.div`{
    margin-left: 60px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }`

const BasketIcon = styled.img`{
      height: 5em;
  }`

const CounterBasket = styled.span`{
      background-color: rgb(255 255 255);
      height: 20px;
      z-index: 9;
      position: absolute;
      width: 20px;
      border-radius: 50%;
      box-shadow: 0px 0px 3px #27407f66;
      font-size: smaller;
      font-weight: 400;
      align-items: center;
      justify-content: center;
      display: flex;
  }`
export default Basket;