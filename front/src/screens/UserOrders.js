import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ordersAPI, shopsAPI } from '../api/api';
import { GET, DELETE } from '../api/fetch';
import { BeatLoader } from 'react-spinners';

const UserOrders = () => {

    const loggedUser = JSON.parse(sessionStorage.getItem('currentLoggedIn')) || false;

    const [orders, setOrders] = useState([]);
    const [load, setLoad] = useState(false);

    const DateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const loadOrders = async () => {
        setLoad(true);
        let res = await GET(ordersAPI.get_by_customer_id, [loggedUser.customer_id]);
        setOrders(await res);
        setLoad(false);
    }

    //*Making sure the 'customers' state is loaded ONCE.
    useEffect(() => {
        setLoad(true);
        loadOrders();
        setLoad(false);
    }, [])


    return (
        <>
            <PContainer>
                <Link to="/adminPage">
                    <ClosePopup>x</ClosePopup>
                </Link>
                <Title>הזמנות</Title>
                {load &&
                    <Loader>
                        <BeatLoader color='teal' loading />
                    </Loader>
                }
                {orders.length === 0 &&
                    <Loader>
                        <BeatLoader color='navy' loading />
                    </Loader>
                }
                {orders.length > 0 && orders.map((order, key) => {

                    const get_shop_name = async (id) => {
                        //order.grocery_shop_name = await GET(shopsAPI.get_by_id, [id]);
                        console.log(`order.grocery_shop_name`, order.grocery_shop_name);
                    }

                    get_shop_name(order.grocery_shop_id);



                    return (
                        <>
                            {key === 0 && <>
                                <OrderLine>
                                    <HrNav />
                                    <CustomerName>סטטוס</CustomerName>
                                    <HrNav />
                                    {order.order_discount > 0 && (<CustomerName>אחוזי הנחה</CustomerName>
                                    )}
                                    {order.order_discount > 0 && <HrNav />}
                                    <CustomerName>סכום בש"ח</CustomerName>
                                    <HrNav />
                                    <CustomerName>תאריך הזמנה</CustomerName>
                                    <HrNav />
                                    <CustomerName>זמן הגעה מועדף</CustomerName>
                                    <HrNav />
                                    {order?.grocery_shop_name !== "" && <CustomerName>שם החנות</CustomerName>}
                                    {order?.grocery_shop_name !== "" && <HrNav />}
                                    <CustomerName>{order.order_id}</CustomerName>
                                </OrderLine>
                            </>}
                            <OrderLine>
                                <span>{key}</span>
                                <HrNav />
                                <CustomerName>{order.order_status}</CustomerName>
                                <HrNav />
                                {order.order_discount > 0 && (<CustomerName>{order.order_discount}</CustomerName>
                                )}
                                {order.order_discount > 0 && <HrNav />}
                                <CustomerName>{order.order_total_price.toFixed(2)}</CustomerName>
                                <HrNav />
                                <CustomerName>{new Date(order.order_date).toLocaleDateString(`he-IL`, DateOptions)}</CustomerName>
                                <HrNav />
                                <CustomerName>{new Date(order.order_ship_date_preference).toLocaleDateString(`he-IL`, DateOptions)}</CustomerName>
                                <HrNav />
                                {order?.grocery_shop_name !== "" && <CustomerName>{order?.grocery_shop_name}</CustomerName>}
                                {order?.grocery_shop_name !== "" && <HrNav />}
                                <CustomerName>{order.order_id}</CustomerName>
                            </OrderLine>
                        </>
                    )
                })}
            </PContainer>
            )
        </>
    )
}

const PContainer = styled.div`{
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: center;
    align-items: center;
    z-index: 3;
    box-shadow: 0px 0px 13px black;
    backdrop-filter: blur(5px);
    overflow-y:scroll;
    overflow-x:hidden;
    width: 100%;
    padding-top: 5rem;
    overflow-y: scroll;
}`

const OrderLine = styled.div`{
    font-weight: 600;
    align-items: center;
    align-text-align: center;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-right: 2rem;
    padding-left: 2rem;
    border: 1px solid rgba(50, 80, 100, 0.95);
    height: 8em;
    font-size: 1.05rem;
    width: 75vh;
    background-color: rgba(255, 255, 255, 0.85);
}`

const CustomerName = styled.span`{
    text-align: center;
    color: rgba(10, 30, 50, 1);
}`


const Title = styled.div`
	{
		font-size: 4.2rem;
		font-weight: bold;
		background: -webkit-linear-gradient(-90deg, white, navy);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		-webkit-text-stroke: 1px lightgrey;
        text-shadow: 0px 0px 3px rgba(0, 0, 100, 0.5);
        margin-bottom: 1rem;

	}
`;

const ClosePopup = styled.button`{
    border: none;
    cursor: pointer;
    margin-top: 1rem;
    margin-left: 1.5rem;
    border-radius: 50%;
    height: 2.5em;
    width: 2.5em;
    box-shadow: 0px 0px 6px lightgrey;
    &:hover {
        transition: 0.3s ease;
        box-shadow: 0px 0px 6px grey;
    }
}`
const Loader = styled.div`{
    display: flex;
    justify-content: center;
    height: 1rem;
    width: 100%;
    z-index: 2;
    margin-bottom: 2px;
}`

const HrNav = styled.hr`{
    height: 4rem;
    display: inline-block;
    border: 1px solid #34468838;
    width: 0px;
    margin: 1rem;
  }`

export default UserOrders;