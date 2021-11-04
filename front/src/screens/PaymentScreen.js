import React, { useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import data from '../data.json';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PaymentScreen = (props) => {
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');

    const removeItem = (event) => {
        console.log(event.value);
    }

    return (
        <div>
            {/* <Navbar ></Navbar> */}
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
                            <UserInput type="text" onChange={event => setPhone(event.target.value)} placeholder={data.customer_data.map(x => x.customer_phone)} />
                        </InputUserData>

                        <InputUserData>
                            <InputUserTitle>
                                <RedSpan> * </RedSpan> שם מלא
                            </InputUserTitle>
                            <UserInput type="text" onChange={event => setFullName(event.target.value)} placeholder={data.customer_data.map(x => x.customer_name)} />
                        </InputUserData>


                    </UserNamePay>

                    <PaymentDataBox>
                        <h3> כתובת למשלוח </h3>
                        <hr />
                        <ScrollBox>
                            <BtnAddPaymentArea>
                                <BtnAddPaymentAreaSpan> + </BtnAddPaymentAreaSpan>
                                <span>הוספה</span>
                            </BtnAddPaymentArea>

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
                        </ScrollBox>
                    </PaymentDataBox>

                    <PaymentDataBox>
                        <PaymentDateTitle>
                            <h3>  data data </h3>
                            <h3> בחירת זמני משלוח </h3>
                        </PaymentDateTitle>

                        <hr />

                        <DateBox>
                            <DaySelectBox>
                                <h4>Day</h4>
                                <p>Date</p>
                                <hr />
                                <p>select time</p>
                                <p>select time</p>
                                <p>select time</p>
                                <p>select time</p>
                                <p>select time</p>
                            </DaySelectBox>

                            <DaySelectBox>
                                <h4>Day</h4>
                                <p>Date</p>
                                <hr />
                                <p>select time</p>
                                <p>select time</p>
                                <p>select time</p>
                                <p>select time</p>
                                <p>select time</p>
                            </DaySelectBox>

                            <DaySelectBox>
                                <h4>Day</h4>
                                <p>Date</p>
                                <hr />
                                <p>select time</p>
                                <p>select time</p>
                                <p>select time</p>
                                <p>select time</p>
                                <p>select time</p>
                            </DaySelectBox>

                            <DaySelectBox>
                                <h4>Day</h4>
                                <p>Date</p>
                                <hr />
                                <p>select time</p>
                                <p>select time</p>
                                <p>select time</p>
                                <p>select time</p>
                                <p>select time</p>
                            </DaySelectBox>

                            <DaySelectBox>
                                <h4>Day</h4>
                                <p>Date</p>
                                <hr />
                                <p>select time</p>
                                <p>select time</p>
                                <p>select time</p>
                                <p>select time</p>
                                <p>select time</p>
                            </DaySelectBox>
                        </DateBox>
                    </PaymentDataBox>

                    <PaymentDataBox>
                        <h3> פרטי התקשורת </h3>
                        <hr />
                        <ScrollBox>
                            <BtnAddPaymentArea>
                                <BtnAddPaymentAreaSpan> + </BtnAddPaymentAreaSpan>
                                <span>הוספה</span>
                            </BtnAddPaymentArea>
                            <DataArea>
                                {data.customer_data.map((item, key) => (
                                    <PayDataArea key={key}>
                                        {item.customer_contact_information.map((subItem, key) =>
                                            <PayDataBox key={key} >
                                                <BtnRemovePaymentBox onClick={event => removeItem(event.target.value)}>x</BtnRemovePaymentBox>
                                                <p>{subItem.contact_information_id}</p>
                                                <p>{subItem.contact_information_data}</p>
                                            </PayDataBox>
                                        )}
                                    </PayDataArea>
                                ))}
                            </DataArea>
                        </ScrollBox>
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
                                                <p>{subItem.credit_last_num}</p>
                                                <p>{subItem.credit_card_name}</p>
                                            </PayDataBoxCard>
                                        )}
                                    </PayDataArea>
                                ))}
                            </DataArea>
                        </ScrollBox>
                    </PaymentBox>

                    <PaymentBox>
                        <h3> סיכום הזמנה </h3>
                        <hr />
                        <PaymentTotalData>
                            <PaymentTotalDataBox>
                                <h3> סכום הזמנה </h3>
                                <h4>₪ 100.00 </h4>
                            </PaymentTotalDataBox>

                            <PaymentTotalDataBox>
                                <h3> עלות משלוח </h3>
                                <h4>₪ 00.00 </h4>
                            </PaymentTotalDataBox>

                            <PaymentTotalDataBox>
                                <h3>  סה״כ לתשלום </h3>
                                <h4>₪ 100.00 </h4>
                            </PaymentTotalDataBox>
                        </PaymentTotalData>

                        <PaymentButtons>
                            <BtnReturnToShop>
                            <Link to="/">המשך בקניה </Link>
                            </BtnReturnToShop>
                            
                            <BtnPay> תשלום </BtnPay>
                        </PaymentButtons>
                    </PaymentBox>
                </OrderDataBox>
            </ContainerPayment>
            <Footer />
        </div>
    )
}

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
    overflow-x: scroll;  
}`

const PayDataArea = styled.div`{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}`

const PayDataBox = styled.div`{
    height: 12em;
    width: 15em;
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
}`
const PaymentBox = styled.div`{
    background-color: #fafafa;
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
}`
const DaySelectBox = styled.div`{
    width: 15%;
    text-align: center;
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

export default PaymentScreen;