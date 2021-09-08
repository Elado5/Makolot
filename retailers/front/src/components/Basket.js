import React from 'react'

const Basket = (props) => {

    const { counterProduct } = props;

    return (
        <div className="basket">
            <img className="basket-icon" alt="basket" src="/images/icons8-shopping-cart-96.png"></img>
            <span id="counter-basket">
                {counterProduct ? (
                    <span> {counterProduct}</span>) : 0}
            </span>
        </div>
    )
}
export default Basket;