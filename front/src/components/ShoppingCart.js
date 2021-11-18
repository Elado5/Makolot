import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ShoppingCard = (props) => {
    const { cartItems, addItem, removeItem, open, setOpen } = props;
    const totalPrice = cartItems.reduce((x, obj) => x + obj.product_price * obj.qty, 0);

    const logOutFunc = () => {

    }

    return (
        <ShoppingCardContainer>
            <RegLogArea>
                <Link to={"/register"}>הרשמה</Link>
                <LoginArea>
                    <div>
                        {/* {userData ? */}
                        <div>
                            <div className="user-name">
                                <span> שלום </span>
                                <Link to="#"> Name </Link>
                            </div>
                            <Link onClick={logOutFunc} to="#logout"> התנתק </Link>
                        </div>
                        <div>
                            <span>שלום אורח</span>
                            <Link to={"/login"}>התחבר</Link>
                        </div>
                        {/* } */}
                    </div>
                    <i className="user-icon fa fa-user-o" aria-hidden="true" />
                </LoginArea>

            </RegLogArea>

            <ShoppingItems>
                <ShipTime>
                    <div>
                        circlecirclecircle
                    </div>
                </ShipTime>

                <div> <hr /></div>

                <TotalItemsArea>
                    <TotalBasket>
                        <CurrencyBasket>₪</CurrencyBasket>
                        {totalPrice.toFixed(2)}
                    </TotalBasket>
                    <div className="basket">
                        <img className="basket-icon" alt="basket" src="/images/icons8-shopping-cart-96.png"></img>
                        <span id="counter-basket">
                            {cartItems.length ? (<span> {cartItems.length} </span>) : 0}
                        </span>
                    </div>
                </TotalItemsArea>


                <div className="basket-main"> <hr />
                    <div>  רשימת הקניות</div>
                    <hr></hr>
                    <div> {cartItems.length === 0 && <div>.הסל ריק, אנא הכנס מוצרים</div>}</div>
                    {cartItems.map((item, key) =>
                        <div key={key}>
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

                                        <Link to={`/product/${item.product_id}`}>
                                            <img className="product-image-basket"
                                                src={item.product_image}
                                                alt={item.product_name} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <hr></hr>
                        </div>
                    )}
                </div>
                <hr />
            </ShoppingItems>

            <div className="pay-area">

                <Link to={{ pathname: "/payment", propsSearch: cartItems }}>
                    <button className="btn-pay">לתשלום</button>
                </ Link>

                <hr />
                <button onClick={() => setOpen(!open)} className="btn-close-basket">^</button>
            </div>
        </ShoppingCardContainer>
    )
}


const ShoppingCardContainer = styled.div`{
    background-color: rgb(250 250 250);
    box-shadow: 6px 8px 10px #0000001f;
    display: flex;
    z-index: 2;
    position: fixed;
    margin-top: 3em;
    width: 27em;
    height: 43em;
    border-radius: 0em 0em 2em 2em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    color: #27407f;
    left: 0;
}`

const RegLogArea = styled.div`{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 22em; 
}`

const LoginArea = styled.div`{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: #27407f;
  font-weight: 500;
  width: 123px;
  font-size: 17px;
}`

const ShoppingItems = styled.div`{
    display: flex;
    flex-direction: column;
    width: 22em;
}`

const ShipTime = styled.div`{
    display: flex;
    flex-direction: column;
    align-items: center;
}`

const TotalItemsArea = styled.div`{
    display: flex;
    justify-content: space-between;
    align-items: center;
}`

const TotalBasket = styled.span`{
    font-size: 45px;
    font-weight: 500;
}`

const CurrencyBasket = styled.span`{
    font-size: 25px;
}`


const ContainerRight = styled.div`{
  
}`

const SearchSomeBtn = styled.button`{
   
}`

const SearchSome = styled.img`{

}`

export default ShoppingCard;