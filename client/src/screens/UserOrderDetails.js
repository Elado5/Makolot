import React, {useState, useEffect} from 'react'
import { Link, useLocation, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import LZString from 'lz-string';
import { shopsAPI } from '../api/api';
import {GET} from '../api/fetch';

const UserOrderDetails = () => {

    const location = useLocation();
    const order_details = location.state?.details;
    const shop_id = location.state?.shop_id;
    const [shopName, setShopName] = useState("");

    const getShopName = async (id) => {
        let shop = await GET(shopsAPI.get_by_id, [id]);
        if (shop[0]?.grocery_shop_name){
            setShopName(shop[0].grocery_shop_name);
        }
        else{
            console.log('not found')
            return;
        }
    }

    useEffect(() => {
        console.log('shop_id', shop_id);
        getShopName(shop_id);
    }, [])

    if (!order_details) {
        alert('הזמנה לא נמצאה')
        return (<Redirect to="/UserPage" />)
    }

    else {
        return (
            <ContainerPopup>
                <Order>
                    <Link className="close-button" to="/UserPage/Orders">
                        X
                    </Link>
                    <Title>הוזמן מהחנות</Title>
                    <ShopName>{shopName}</ShopName>
                    <Title>מוצרי ההזמנה</Title>
                    {LZString.decompress(order_details).split(",").map(item => <OrderLine>{item}</OrderLine>)}
                </Order>
            </ContainerPopup>
        )
    }

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

const Order = styled.div`{
    background-color: rgba(255, 255, 255, 0.9);
    height: 52em;
    width: 45%;
    display: flex;
    border-radius: 40px;
    display: flex;
    align-self: center;
    align-items: center;
    flex-direction: column;
    justify-content: space-evenly;
    position: relative;
    overflow-Y: scroll;

}`

const OrderDetail = styled.span`{
    text-align: center;
    color: rgba(10, 30, 50, 1);
    width: 20vh;
    font-weight: 400;
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
    border-top: 2px solid rgba(50, 80, 160, 0.25);
    height: 7rem;
    font-size: 1.65rem;
    width: 100%;
		background: -webkit-linear-gradient(-90deg, white, navy);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
        text-shadow: 0px 0px 3px rgba(0, 35, 60, 0.5);
        margin-bottom: 1rem;
}`

const ShopName = styled.div`{
    font-weight: 600;
    align-items: center;
    text-align: center;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-right: 2rem;
    padding-left: 2rem;
    height: 2rem;
    font-size: 2rem;
    width: 100%;
		background: -webkit-linear-gradient(-90deg, white, navy);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
        text-shadow: 0px 0px 3px rgba(0, 65, 70, 0.5);
}`

const Title = styled.div`
	{
		font-size: 4.2rem;
		font-weight: bold;
		background: -webkit-linear-gradient(-90deg, white, navy);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		-webkit-text-stroke: 1px lightgrey;
        text-shadow: 0px 0px 3px rgba(0, 40, 100, 0.5);
        margin-bottom: 1rem;
	}
`;

export default UserOrderDetails;