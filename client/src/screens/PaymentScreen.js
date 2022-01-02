import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import data from '../data.json';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import { addressesAPI, customersAPI, ordersAPI } from '../api/api';
import { GET, POST } from '../api/fetch';
import { BeatLoader } from 'react-spinners';
import LZString from 'lz-string';

const PaymentScreen = ({ cartItems, setCartItems }) => {

    const loggedUser = JSON.parse(sessionStorage.getItem('currentLoggedIn')) || false;

    const totalPrice = cartItems.reduce((x, obj) => x + obj.product_final_price * obj.qty, 0);
    const delieveryPrice = 0;
    const [fullName, setFullName] = useState(`${loggedUser.customer_first_name} ${loggedUser.customer_last_name}` || "");
    const [phone, setPhone] = useState(loggedUser.customer_phone_number || "");
    const [addresses, setAddresses] = useState([]);
    const [time, setTime] = useState(new Date());
    const DateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const [loadingAddress, setLoadingAddress] = useState(false);
    const [loadingOrder, setLoadingOrder] = useState(false);

    const orderTimeChoices = ["11:00", "13:00", "15:00", "17:00", "19:00"];

    const getAddress = async () => {
        setLoadingAddress(true);
        const customer = await GET(customersAPI.get_by_id, [loggedUser.customer_id]);
        const res = await GET(addressesAPI.get_by_id, [customer.address_id]);
        setAddresses(await res);
        setLoadingAddress(false);

    }

    const addOrder = async () => {
        setLoadingOrder(true);
        try {
            const payload = {
                "order_status": "בתהליך",
                "order_discount": 0,
                "order_total_price": totalPrice,
                "order_details": LZString.compress(cartItems.map((item, key) => { return `${item.product_name}: ${item.product_final_price.toFixed(2)}₪ ` }).toString()),
                "order_date": new Date(Date.now()).toDateString(),
                "customer_id": loggedUser.customer_id,
                "order_ship_date_preference": new Date(Date.now() + 1000 * 3600 * 2).toDateString(),
                "grocery_shop_id": 7
            }
            console.log(`payload`, payload)
            console.log(`payload.order_details`, LZString.decompress(payload.order_details))
            const res = await POST(ordersAPI.post_add, payload);
            console.log(`res`, res)
            if (res?.order_id) {
                localStorage.removeItem('cartItems');
                //cartItems = [];
                alert('ההזמנה נשלחה בהצלחה!\nניתן לצפות בפרטי ההזמנה באזור האישי');
                window.location = '/';
            }
        }
        catch (err) { console.error(err) };
        setLoadingOrder(false);

    }

    const removeItem = (event) => {
        console.log(event.value);
    }

    useEffect(() => {
        getAddress();
    }, []);

    if (cartItems.length === 0) {
        return (
            <Redirect to="/" />
        )
    }

    /* //? Michelle version of DateArea
        <DataArea>
        {data.customer_data.map((item, key) => (
            <PayDataArea key={key}>
                {item.customer_address.map((subItem, key) =>
                    <PayDataBox key={key} >
                        <BtnRemovePaymentBox onClick={event => removeItem(event.target.value)}>x</BtnRemovePaymentBox>
                        <p>{subItem.address_id}</p>
                        <p>{subItem.address_data}</p>
                    </PayDataBox>
                )}
            </PayDataArea>
        ))}
    </DataArea>
    */

    return (
        <ContainerPopup>
            {/* <Navbar cartItems={cartItems}></Navbar> */}
            <ContainerPayment>

                <h3>פרטים למשלוח</h3>

                <OrderDataBox>
                    <h3>עבור מי ההזמנה</h3>
                    <hr />

                    <UserNamePay>
                        <InputUserData>
                            <InputUserTitle>
                                <RedSpan> * </RedSpan> טלפון
                            </InputUserTitle>
                            <UserInput type="text" onChange={event => setPhone(event.target.value)} placeholder={phone} />
                        </InputUserData>

                        <InputUserData>
                            <InputUserTitle>
                                <RedSpan> * </RedSpan> שם מלא
                            </InputUserTitle>
                            <UserInput type="text" onChange={event => setFullName(event.target.value)} placeholder={fullName} />
                        </InputUserData>


                    </UserNamePay>

                    <PaymentDataBox>
                        <h3> כתובת למשלוח </h3>
                        <hr />
                        <ScrollBox>
                            <BtnAddPaymentArea>
                                <Link to={`/payment/registerAddress`}>לשינוי</Link>
                            </BtnAddPaymentArea>

                            <DataArea>
                                {loadingAddress &&
                                    <Loader>
                                        <BeatLoader color='navy' loading />
                                    </Loader>
                                }
                                {addresses?.length > 0 &&
                                    <PayDataArea >
                                        <PayDataBox>
                                            <h5>{addresses[0].city}</h5>
                                            <Hr />
                                            <p>{addresses[0].street}</p>
                                            {addresses[0].zip_code !== "" && <p>מיקוד -  {addresses[0].zip_code}</p>}
                                            {addresses[0].other_data !== "" && <p>{addresses[0].other_data} </p>}

                                        </PayDataBox>
                                    </PayDataArea>
                                }

                            </DataArea>
                        </ScrollBox>
                    </PaymentDataBox>

                    <PaymentDataBox>
                        <PaymentDateTitle>
                            <h3>  {time.toLocaleDateString(`he-IL`, DateOptions)} </h3>
                            <h3> בחירת זמני משלוח </h3>
                        </PaymentDateTitle>

                        <hr />

                        <DateBox>
                            <DaySelectBox>
                                <h4>{(new Date(Date.now() + 1000 * 3600 * 24)).toLocaleDateString(`he-IL`, { weekday: 'short' })}</h4>
                                <p>{((new Date(Date.now() + 1000 * 3600 * 24)).getDate() + '-' + ((new Date(Date.now() + 1000 * 3600 * 24)).getMonth() + 1) + '-' + (new Date(Date.now() + 1000 * 3600 * 24)).getFullYear())}</p>
                                <Hr />
                                {orderTimeChoices.map((time, key) => 
                                    <>
                                        <h6>{time}</h6>
                                        {key !== 4 && <HrSmall/>}
                                    </>
                                )
                            }
                            </DaySelectBox>

                            <DaySelectBox>
                                <h4>{(new Date(Date.now() + 1000 * 3600 * 48)).toLocaleDateString(`he-IL`, { weekday: 'short' })}</h4>
                                <p>{(new Date(Date.now() + 1000 * 3600 * 48)).getDate() + '-' + ((new Date(Date.now() + 1000 * 3600 * 48)).getMonth() + 1) + '-' + (new Date(Date.now() + 1000 * 3600 * 48)).getFullYear()}</p>
                                <Hr />
                                {orderTimeChoices.map((time, key) => 
                                    <>
                                        <h6>{time}</h6>
                                        {key !== 4 && <HrSmall/>}
                                    </>
                                )
                            }
                            </DaySelectBox>

                            <DaySelectBox>
                                <h4>{(new Date(Date.now() + 1000 * 3600 * 72)).toLocaleDateString(`he-IL`, { weekday: 'short' })}</h4>
                                <p>{(new Date(Date.now() + 1000 * 3600 * 72)).getDate() + '-' + ((new Date(Date.now() + 1000 * 3600 * 72)).getMonth() + 1) + '-' + (new Date(Date.now() + 1000 * 3600 * 72)).getFullYear()}</p>
                                <Hr />
                                {orderTimeChoices.map((time, key) => 
                                    <>
                                        <h6>{time}</h6>
                                        {key !== 4 && <HrSmall/>}
                                    </>
                                )
                            }
                            </DaySelectBox>

                            <DaySelectBox>
                                <h4>{(new Date(Date.now() + 1000 * 3600 * 96)).toLocaleDateString(`he-IL`, { weekday: 'short' })}</h4>
                                <p>{(new Date(Date.now() + 1000 * 3600 * 96)).getDate() + '-' + ((new Date(Date.now() + 1000 * 3600 * 96)).getMonth() + 1) + '-' + (new Date(Date.now() + 1000 * 3600 * 96)).getFullYear()}</p>
                                <Hr />
                                {orderTimeChoices.map((time, key) => 
                                    <>
                                        <h6>{time}</h6>
                                        {key !== 4 && <HrSmall/>}
                                    </>
                                )
                            }
                            </DaySelectBox>

                            <DaySelectBox>
                                <h4>{(new Date(Date.now() + 1000 * 3600 * 120)).toLocaleDateString(`he-IL`, { weekday: 'short' })}</h4>
                                <p>{(new Date(Date.now() + 1000 * 3600 * 120)).getDate() + '-' + ((new Date(Date.now() + 1000 * 3600 * 120)).getMonth() + 1) + '-' + (new Date(Date.now() + 1000 * 3600 * 120)).getFullYear()}</p>
                                <Hr />
                                {orderTimeChoices.map((time, key) => 
                                    <>
                                        <h6>{time}</h6>
                                        {key !== 4 && <HrSmall/>}
                                    </>
                                )
                            }
                            </DaySelectBox>
                        </DateBox>
                    </PaymentDataBox>

                    <PaymentBox>
                        <h3> אמצעי תשלום </h3>
                        <hr />
                        <ScrollBox>
                            <BtnAddPaymentArea>
                                <BtnAddPaymentAreaSpan> + </BtnAddPaymentAreaSpan>
                                <span>הוספה</span>
                            </BtnAddPaymentArea>
                            <DataArea>
                                {data.customer_data.map((item, key) => (
                                    <PayDataArea key={key}>
                                        {item.customer_credit_card_id.map((subItem, key) =>
                                            <PayDataBoxCard key={key}>
                                                <BtnRemovePaymentBox onClick={event => removeItem(event.target.value)}>x</BtnRemovePaymentBox>
                                                <h4>{subItem.credit_last_num}</h4>
                                                <h3>{subItem.credit_card_name}</h3>
                                            </PayDataBoxCard>
                                        )}
                                    </PayDataArea>
                                ))}
                            </DataArea>
                        </ScrollBox>
                    </PaymentBox>

                    <PaymentBox>
                        <div className="basket-main"> <hr />
                            <div>רשימת הקניות</div>
                            <hr></hr>
                            <div> {cartItems.length === 0 && <div>.הסל ריק, אנא הכנס מוצרים</div>}</div>
                            {cartItems.map((item, key) =>
                                <div key={key}>
                                    <PaymentBasket className="product-item-basket">
                                        <div className="product-remove-basket">
                                            <div className="">
                                                <span className="currency-basket">₪</span>
                                                {(item.product_final_price * item.qty).toFixed(2)}
                                            </div>
                                        </div>

                                        <div>{item.product_name}</div>
                                        <div>:כמות<br />{item.qty}</div>

                                        <div className="item-basket">
                                            <div className="image-container-basket">
                                                <CountManage>
                                                    {item.qty}
                                                </CountManage>
                                                <img className="product-image-basket"
                                                    src={item.product_image}
                                                    alt={item.product_name} />
                                            </div>
                                        </div>
                                    </PaymentBasket>
                                    <hr></hr>
                                </div>
                            )}
                        </div>
                        <hr />
                        <h3> סיכום הזמנה </h3>
                        <hr />
                        {loadingOrder &&
                            <Loader>
                                <BeatLoader color='navy' loading />
                            </Loader>
                        }
                        <PaymentTotalData>
                            <PaymentTotalDataBox>
                                <h3>  סה״כ לתשלום </h3>
                                <h4>₪ {(totalPrice + delieveryPrice).toFixed(2)} </h4>
                            </PaymentTotalDataBox>

                            <PaymentTotalDataBox>
                                <h3> עלות משלוח </h3>
                                {delieveryPrice === 0 && <h4>!חינם</h4>}
                                {delieveryPrice > 0 && <h4>₪ {delieveryPrice.toFixed(2)} </h4>}
                            </PaymentTotalDataBox>

                            <PaymentTotalDataBox>

                                <h3> סכום הזמנה </h3>
                                <h4>₪ {totalPrice.toFixed(2)}</h4>
                            </PaymentTotalDataBox>
                        </PaymentTotalData>

                        <PaymentButtons>
                            <BtnReturnToShop>
                                <Link to="/">המשך בקניה </Link>
                            </BtnReturnToShop>

                            <BtnPay onClick={addOrder}> תשלום </BtnPay>
                        </PaymentButtons>
                    </PaymentBox>

                </OrderDataBox>
            </ContainerPayment>
            <Footer />
        </ContainerPopup>
    )
}

const ContainerPopup = styled.div`{
    position: fixed;
    background-color: #fafafa;
    height: 100vh;
    width: 100%;
    overflow: scroll;
}`

const ContainerPayment = styled.div`{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    text-align: end;
    padding-right: 10em;
    color: #27407f;
    background-color: #fafafa;
}`

const BtnAddPaymentArea = styled.button`{
    border: none;
    color: #27407f;
    font-size: 28px;
    font-weight: 600;
    background-color: transparent;
    outline: none;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 5em;
    justify-content: space-between;
}`

const BtnPay = styled.button`{
    background-color: #27407f;
    box-shadow: 1px 2px 3px #27407f66;
    color: aliceblue;
    border: none;
    border-radius: 25px;
    height: 2.5em;
    width: 10em;
    font-family: system-ui;
    cursor: pointer;
    font-weight: 500;
    transition: 0.5s;
}`

const BtnAddPaymentAreaSpan = styled.span`{
    color: #f5a41e;
    font-size: 40px;
    font-weight: 600;
}`

const ScrollBox = styled.div`{
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
}`

const PaymentDataBox = styled.div`{
    background-color: #eff0f4;
    border-radius: 2em;
    margin: 3em;
    padding: 2em;
    width: 65em;
}`

const UserNamePay = styled.div`{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding-right: 4em;
}`

const InputUserData = styled.div`{
    margin-left: 3em;
    display: flex;
    flex-direction: column;
    padding: 10px;
}`

const DataArea = styled.div`{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
}`

const PayDataArea = styled.div`{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}`

const PayDataBox = styled.div`{
    display: flex;
    flex-direction: column;
    align-items: center;
    align-text: center;
    height: 14em;
    width: 18em;
    border-radius: 1em;
    background-color: rgb(220 224 234);
    margin: 1em;
    padding: 1em;
    overflow: auto;
    transition: 0.5s;
    font-size: 1em;

    &:hover{
        background-color: #aabff1;
        box-shadow: 1px 2px 3px #27407f66;
    }
}`

const PaymentBox = styled.div`{
    background-color: #fafafa;
}`

const PaymentBasket = styled.div`{
    align-items: center;
}`

const BtnRemovePaymentBox = styled.button`{
    background-color: white;
    color: #27407f;
    font-size: 20px;
    border: none;
    border-radius: 50%;
    box-shadow: 1px 2px 3px #27407f66;
    place-self: flex-start;
    width: 19%;
    height: 23%;
    margin-top: -25px;
    margin-left: -25px;
}`

const PayDataBoxCard = styled.div`{
    height: 13em;
    width: 20em;
    border-radius: 1em;
    background-color: rgb(220 224 234);
    margin: 1em;
    padding: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: 0.5s;

    &:hover{
        background-color: #aabff1;
        box-shadow: 1px 2px 3px #27407f66;
    }

    ${BtnRemovePaymentBox}{
        width: 14%;
    }
}`
const PaymentDateTitle = styled.div`{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}`
const DateBox = styled.div`{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    direction: rtl;
}`
const DaySelectBox = styled.div`{
    width: 15%;
    text-align: center;
    h6{
        cursor: pointer;
        :hover{
            text-shadow: 0 0 1px lightblue;
            font-size: 1.1rem;
            transition: 0.5s;
        }
    }
}`

const PaymentTotalData = styled.div`{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}`

const PaymentTotalDataBox = styled.div`{
    margin: 2em;
}`

const PaymentButtons = styled.div`{
    display: flex;
    justify-content: flex-end;
    margin: 1em;
}`


const BtnReturnToShop = styled.button`{
    background-color: #fafafa;
    color: #27407f;
    border: 1 px solid #27407f;
    border-radius: 25px;
    height: 2.5em;
    width: 10em;
    font-family: system-ui;
    cursor: pointer;
    font-weight: 500;
    margin-right: 30px;
    transition: 0.5s;

    &:hover{
        box-shadow: 1px 2px 3px #27407f66;
    }
}`

const OrderDataBox = styled.div`{
    margin-top: 3em;
}`

const RedSpan = styled.span`{
    color: red;
    font-size: 25px;
}`

const InputUserTitle = styled.span`{
    font-size: 20px;
    font-weight: 700;
}`

const UserInput = styled.input`{
    border: none;
    border-bottom: 1px solid #dfdfdf;
    background-color: #fafafa;
    outline: none;
    text-align: right;
    padding-top: 1em;
}`


const CountManage = styled.div`{
    display: flex;
    align-items: center;
    align-self: flex-end;
    position: absolute;
    margin-bottom: 60px;
    margin-right: 10px;
    z-index: 5;
}`

const Loader = styled.div`{
    display: flex;
    justify-content: right;
    padding-right: 3rem;
    width: 100%;
    z-index: 8;
}`;

const Hr = styled.hr`{
    border: 1px solid #27407f;
    width: 80%;
}`;

const HrSmall = styled.hr`{
    border: 0.5px solid lightgrey;
    width: 50%;
}`;

export default PaymentScreen;