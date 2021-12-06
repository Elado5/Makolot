import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ShoppingCard = (props) => {
    const { cartItems, addItem, removeItem, completelyRemoveItem, open, setOpen } = props;
    const totalPrice = cartItems.reduce((x, obj) => x + obj.product_final_price * obj.qty, 0);
    const moneySaved = (cartItems.reduce((x, obj) => x + obj.product_price * obj.qty, 0) - cartItems.reduce((x, obj) => x + obj.product_final_price * obj.qty, 0));


    //* get currently logged in admin if it exists
    const loggedAdmin = JSON.parse(sessionStorage.getItem('adminLoggedIn')) || false;
    //*get currently logged in user if it exists
    const loggedUser = JSON.parse(sessionStorage.getItem('currentLoggedIn')) || false;

    const logOutFunc = () => {
        sessionStorage.removeItem(`currentLoggedIn`);
        alert('logged out succesfully!')
        window.location = "/";
    }
    const adminLogOutFunc = () => {
        sessionStorage.removeItem(`adminLoggedIn`);
        alert('logged out admin succesfully!')
        window.location = "/";
    }

    return (
        <ShoppingCardContainer>
            <RegLogArea>
                {!loggedUser && !loggedAdmin && <Link to={"/register"}>הרשמה</Link>}
                {(loggedUser || loggedAdmin) && <div id="filler for styling"></div>}
                <LoginArea loggedUser={loggedUser} loggedAdmin={loggedAdmin}>
                    <div>
                        {loggedUser && <div>
                            <div className="user-name">
                                <div> שלום </div>
                                <Link to="#"> {loggedUser.customer_first_name} {loggedUser.customer_last_name} </Link>
                            </div>
                            <Link onClick={logOutFunc} to="#logout"> התנתק </Link>
                        </div>
                        }
                        {loggedAdmin && <div>
                            <div>שלום אדמין</div>
                            <Link to="/adminPage"> מעבר לדף מנהל </Link>
                            <Link onClick={adminLogOutFunc} to="/"> התנתק </Link>
                        </div>
                        }
                        {!loggedUser && !loggedAdmin && <div>
                            <div>שלום אורח</div>
                            <Link to={"/login"}>התחבר</Link>
                        </div>
                        }
                    </div>
                    <i className="user-icon fa fa-user-o" aria-hidden="true" />
                </LoginArea>

            </RegLogArea>

            <ShoppingItems>
                <ShipTime>
                    <div>
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
                    {cartItems.map((item, key) => item.qty > 0 &&
                        <div key={key}>
                            <div className="product-item-basket">
                                <div className="product-remove-basket">
                                    <button className="remove-item-basket" onClick={() => completelyRemoveItem(item)}>x</button>
                                    <div className="">
                                        <span className="currency-basket">₪</span>
                                        {(item.product_final_price * item.qty).toFixed(2)}
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

                                        <Link to={{
                                            pathname: `/product/${item.product_id}`,
                                            state: { id: item.product_id }
                                        }}>
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

                <MoneySaved>₪{moneySaved.toFixed(2)} - בקניה זו חסכת</MoneySaved>
                <hr />
            </ShoppingItems>

            <div className="pay-area">
                {loggedUser &&
                    <Link to={{
                        pathname: "/payment",
                        propsSearch: cartItems
                    }}>
                        <button className="btn-pay">לתשלום</button>
                    </ Link>
                }
                {!loggedUser &&
                    <button className="btn-pay"
                        onClick={() => alert("Please login to make a purchase.\n.אנא התחברו על מנת לבצע הזמנה")}>לתשלום
                    </button>
                }
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
    width: 26em;
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
  justify-content: ${loggedUser => loggedUser ? "space-between" : "right"};
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
const MoneySaved = styled.span`{
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
    font-size: 1.75rem;
    text-shadow: 0px 0px 2px skyblue;

}`


const ContainerRight = styled.div`{
  
}`

const SearchSomeBtn = styled.button`{
   
}`

const SearchSome = styled.img`{

}`

export default ShoppingCard;