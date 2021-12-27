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

    const DateOptions = { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };

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
                <Link to="/UserPage">
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
                <table>
                    {orders.length > 0 && orders.map((order, key) => {

                        const get_shop_name = async (id) => {
                            //order.grocery_shop_name = await GET(shopsAPI.get_by_id, [id]);
                            console.log(`order.grocery_shop_name`, order.grocery_shop_name);
                        }

                        get_shop_name(order.grocery_shop_id);



                        return (
                            <>
                                {key === 0 && <>
                                    <HeaderLine>
                                        <HeaderDetail>מספר הזמנה</HeaderDetail>
                                        <HrHeader />
                                        <HeaderDetail>סטטוס</HeaderDetail>
                                        <HrHeader />
                                        {order.order_discount > 0 && (<HeaderDetail>אחוזי הנחה</HeaderDetail>
                                        )}
                                        {order.order_discount > 0 && <HrHeader />}
                                        <HeaderDetail>סכום בש"ח</HeaderDetail>
                                        <HrHeader />
                                        <HeaderDetail>תאריך הזמנה</HeaderDetail>
                                        <HrHeader />
                                        <HeaderDetail>זמן הגעה מועדף</HeaderDetail>
                                        <HrHeader />
                                        {order?.grocery_shop_name !== undefined && <HeaderDetail>שם החנות</HeaderDetail>}
                                        {order?.grocery_shop_name !== undefined && <HrDetail />}
                                        <HeaderDetail>מספר סידורי</HeaderDetail>
                                    </HeaderLine>
                                </>}
                                <Link to={{
                                    pathname: `/UserPage/orderDetails`,
                                    state: { details: order.order_details }
                                }}>
                                <OrderLine>
                                    <OrderDetail>{key + 1}</OrderDetail>
                                    <HrDetail />
                                    <OrderDetail>{order.order_status}</OrderDetail>
                                    <HrDetail />
                                    {order.order_discount > 0 && (<OrderDetail>{order.order_discount}</OrderDetail>
                                    )}
                                    {order.order_discount > 0 && <HrDetail />}
                                    <OrderDetail>{order.order_total_price.toFixed(2)}</OrderDetail>
                                    <HrDetail />
                                    <OrderDetail>{new Date(order.order_date).toLocaleDateString(`he-IL`, DateOptions)}</OrderDetail>
                                    <HrDetail />
                                    <OrderDetail>{new Date(order.order_ship_date_preference).toLocaleDateString(`he-IL`, DateOptions)}</OrderDetail>
                                    <HrDetail />
                                    {order?.grocery_shop_name !== undefined && <OrderDetail>{order?.grocery_shop_name}</OrderDetail>}
                                    {order?.grocery_shop_name !== undefined && <HrDetail />}
                                    <OrderDetail>{order.order_id}</OrderDetail>
                                </OrderLine>
                            </Link>
                            </>
                )
                    })}
            </table>
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
    text-align: center;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-right: 2rem;
    padding-left: 2rem;
    border: 1px solid rgba(50, 80, 100, 0.95);
    height: 7em;
    font-size: 1.05rem;
    width: 75vh;
    background-color: rgba(255, 255, 255, 0.85);
    :hover{
        background-color: rgba(235, 235, 255, 0.85);
        transition: 0.3s;

    }
}`

const HeaderLine = styled.div`{
    font-weight: 600;
    align-items: center;
    text-align: center;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-right: 2rem;
    padding-left: 2rem;
    height: 4.5em;
    font-size: 1.05rem;
    width: 75vh;
    background-color: rgba(230, 230, 255, 0.9);
    border: 1px solid navy;
    color: rgba(10, 50, 50, 1);

}`

const HeaderDetail = styled.div`{
    text-align: center;
    color: rgba(10, 30, 50, 1);
    width: 20vh;
    font-weight: 600;
    background: -webkit-linear-gradient(-90deg, darkblue, navy);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
        text-shadow: 0px 0px 2px rgba(0, 85, 150, 0.5);
}`

const OrderDetail = styled.span`{
    text-align: center;
    color: rgba(10, 30, 50, 1);
    width: 20vh;
    font-weight: 500;
    background: -webkit-linear-gradient(-90deg, darkblue, navy);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
        text-shadow: 0px 0px 2px rgba(0, 85, 150, 0.5);
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

const HrDetail = styled.hr`{
    height: 6rem;
    display: inline-block;
    border: 1px solid #34468838;
    width: 0px;
    margin: 1rem;
  }`

const HrHeader = styled.hr`{
    height: 4rem;
    display: inline-block;
    border: 1px solid #34468838;
    width: 0px;
    margin: 1rem;
  }`

export default UserOrders;