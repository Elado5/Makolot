import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItemToCart } from '../actionsRedux/productActionRedux';
import Basket from './Basket';

const ShoppingCard = (props) => {
    const { cartItems, addItem, removeItem, open, setOpen } = props;
    const totalPrice = cartItems.reduce((x, obj) => x + obj.product_price * obj.qty, 0);
    const dispatch = useDispatch();

    useEffect(() => {
        cartItems.map((item) =>
            dispatch(addItemToCart(item.product_id, item.qty)))
    }, []);

    return (
        <div className="shopping-card">

            <div className="reg-log-area">
                <Link to={"/register"}>הרשמה</Link>

                <div className="login-area">
                    <div>
                        <span>שלום אורח</span>
                        <Link to={"/login"}>התחבר</Link>
                    </div>
                    <i className="user-icon fa fa-user-o" aria-hidden="true"></i>
                </div>

            </div>

            <div className="shopping-items">
                <div className="ship-time">
                    <div>
                        circlecirclecircle
                    </div>
                </div>

                <div> <hr /></div>

                <div className="total-items-area">
                    <div className="total-basket">
                        <span className="currency-basket">₪</span>
                        {totalPrice.toFixed(2)}
                    </div>
                    <Basket counterProduct={cartItems.length} />
                </div>


                <div className="basket-main"> <hr />
                    <div>  רשימת הקניות</div>
                    <hr></hr>
                    <div>{cartItems.length === 0 && <div>.הסל ריק, אנא הכנס מוצרים</div>}</div>
                    {cartItems.map((item) =>
                        <div key={item.product_id}>
                            <div className="product-item-basket">
                                <div className="product-remove-basket">
                                    <button className="remove-item-basket">x</button>
                                    <div className="">
                                        <span className="currency-basket">₪</span>
                                        {item.product_price.toFixed(2)}
                                    </div>
                                </div>

                                <div className="item-basket">
                                    <div>{item.product_name}</div>
                                    <div className="image-container-basket">
                                        <div className="count-manage">
                                            <button onClick={() => addItem(item)}>+</button>
                                            {item.qty}
                                            <button onClick={() => removeItem(item)}>-</button>
                                        </div>

                                        <a href={`/product/${item.product_id}`}>
                                            <img className="product-image-basket"
                                                src={item.product_image}
                                                alt={item.product_name} />
                                        </a>
                                    </div>

                                </div>
                            </div>
                            <hr></hr>
                        </div>
                    )}
                </div>
                <hr />
            </div>

            <div className="pay-area">
                <button className="btn-pay">לתשלום</button>
                <hr />
                <button onClick={() => setOpen(!open)} className="btn-close-basket">^</button>
            </div>

        </div>
    )
}
export default ShoppingCard;