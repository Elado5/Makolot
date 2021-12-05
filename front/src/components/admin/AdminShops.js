import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { shopsAPI } from '../../api/api';
import { GET, POST, PUT, DELETE } from '../../api/fetch';


const AdminShops = () => {
    const [shops, setShops] = useState([]);
    const [shopsLoaded, setShopsLoaded] = useState(false);

    const loadShopsByName = async (name) => {
        let res = await GET(shopsAPI.get_by_name, [name]);
        console.log(res);
        if (res.length > 0)
            setShops(res);
    }

    const loadShops = async () => {
        let res = await GET(shopsAPI.get_all);
        setShops(res);
    }

    const ActivateItem = async (id) => {
        try {
            let res = await PUT(shopsAPI.put_activate, [id]);
            loadShops(res);
        }
        catch (err) {
            console.error(`err`, err)
        }
    }

    const DeactivateItem = async (id) => {
        try {
            let res = await PUT(shopsAPI.put_deactivate, [id]);
            loadShops(res);
        }
        catch (err) {
            console.error(`err`, err)
        }
    }

    const DeleteItem = async (id) => {
        try {
            let choice = window.confirm('Are you sure you want to delete this item?');
            if (choice) {
                let res = await DELETE(shopsAPI.delete_product, [id]);
                loadShops(res);
            }
            else {
                alert('The product was not deleted.')
            }
        }
        catch (err) {
            console.error(`err`, err)
        }
    }

    //*Making sure the 'Shops' state is loaded ONCE.
    useEffect(() => {
        if (!shopsLoaded) {
            loadShops();
            setShopsLoaded(true);
        }
        else {
            console.log(`Shops Loaded:`, shopsLoaded)
        }
    }, [shopsLoaded])


    return (
        <PContainer>
            <Link to="/adminPage"><ClosePopup>x</ClosePopup></Link>
            <Title>ניהול חנויות</Title>
            {shops.length > 0 && shops.map((shop, key) => {
                return (
                    <ShopLine>
                        <span>{key}</span>
                        <ShopName>{shop.grocery_shop_name}</ShopName>
                        {shop.isActive && <Active>ACTIVE</Active>}
                        {!shop.isActive && <Inactive>INACTIVE</Inactive>}
                        <ShopName><Link to={`/adminPage/shop/${shop.grocery_shop_id}`}>Update</Link></ShopName>
                        {shop.isActive && <Hover onClick={() => { DeactivateItem(shop.grocery_shop_id) }}>Deactivate</Hover>}
                        {!shop.isActive && <Hover onClick={() => { ActivateItem(shop.grocery_shop_id) }}>Activate</Hover>}
                        <Delete onClick={() => { DeleteItem(shop.grocery_shop_id) }}>Delete</Delete>
                    </ShopLine>
                )
            })}
        </PContainer>
    )
};

const PContainer = styled.div`{
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: center;
    align-items: center;
    z-index: 3;
    width: 75vh;
    box-shadow: 0px 0px 13px black;
    backdrop-filter: blur(5px);
    overflow-y:scroll;
    overflow-x:hidden;
    width: 100%;
    padding-top: 5rem;
  
}`

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

const Title = styled.div`
	{
		font-size: 3.5rem;
		font-weight: bold;
		background: -webkit-linear-gradient(-90deg, white, navy);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		-webkit-text-stroke: 1px lightgrey;
        text-shadow: 0px 0px 3px black;
	}
`;

const ShopLine = styled.div`{
    font-weight: 600;
    align-items: center;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-right: 2rem;
    padding-left: 2rem;
    border: 1px solid rgba(50, 80, 100, 0.95);
    height: 6em;
    font-size: 1.05rem;
    width: 75vh;
    background-color: rgba(255, 255, 255, 0.85);
    img{
        width: 3rem;
        height: 20px:
        justify-content: left;
    }
    span{
        width: 10rem;
    }

}`

const ShopName = styled.span`{
    text-align: center;
    padding-right: 1rem;
    color: rgba(10, 30, 50, 1);
}`

const Active = styled.span`{
    text-align: center;
    color: green;
}`
const Inactive = styled.span`{
    text-align: center;
    color: red;
}`

const Hover = styled.span`{
    cursor: pointer;
    :hover{
        text-decoration: underline;
    }
}`

const Delete = styled.span`{
    color: darkred;
    cursor: pointer;
    text-align: center;
    :hover{
        text-decoration: underline;
    }
}`

export default AdminShops