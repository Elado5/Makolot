import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { productsAPI } from '../../api/api';
import { GET, POST, PUT, DELETE } from '../../api/fetch';
import { BarLoader, BeatLoader } from 'react-spinners';


const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [productsLoaded, setProductsLoaded] = useState(false);
    const [activationLoad, setActivationLoad] = useState(false);

    const loadProductsByName = async (name) => {
        let res = await GET(productsAPI.get_by_name, [name]);
        console.log(res);
        if (res.length > 0)
            setProducts(res);
    }

    const loadProducts = async () => {
        let res = await GET(productsAPI.get_all);
        setProducts(res);
    }

    const ActivateItem = async (id) => {
        try {
            setActivationLoad(true);
            let res = await PUT(productsAPI.put_activate, [id]);
            loadProducts(res);
        }
        catch (err) {
            console.error(`err`, err)
        }
        setActivationLoad(false);
    }

    const DeactivateItem = async (id) => {
        try {
            setActivationLoad(true);
            let res = await PUT(productsAPI.put_deactivate, [id]);
            loadProducts(res);
        }
        catch (err) {
            console.error(`err`, err)
        }
        setActivationLoad(false);
    }

    const DeleteItem = async (id) => {
        try {
            let choice = window.confirm('Are you sure you want to delete this item?');
            if (choice) {
                let res = await DELETE(productsAPI.delete_product, [id]);
                loadProducts(res);
            }
            else {
                alert('The product was not deleted.')
            }
        }
        catch (err) {
            console.error(`err`, err)
        }
    }

    //*Making sure the 'products' state is loaded ONCE.
    useEffect(() => {
        if (!productsLoaded) {
            loadProducts();
            setProductsLoaded(true);
        }
        else {
            console.log(`Products Loaded:`, productsLoaded)
        }
    }, [productsLoaded])


    return (
        <PContainer>
            <Link to="/adminPage"><ClosePopup>x</ClosePopup></Link>
            <Title>ניהול מוצרים</Title>
            {activationLoad &&
                <Loader>
                    <BarLoader color='navy' loading />
                </Loader>
            }
            <Loader>
                {products.length === 0 && <BeatLoader color='navy' loading />}
            </Loader>
            {products.length > 0 && products.map((product, key) => {
                return (
                    <>
                        <ProductLine>
                            <span>{key}</span>
                            <span><img src={product.product_image} alt={product.product_name} /></span>
                            <ProductName>{product.product_name}</ProductName>
                            {product.isActive && <Active>ACTIVE</Active>}
                            {!product.isActive && <Inactive>INACTIVE</Inactive>}
                            <ProductName><Link to={`/adminPage/product/${product.product_id}`}>Update</Link></ProductName>
                            {product.isActive && <Hover onClick={() => { DeactivateItem(product.product_id) }}>Deactivate</Hover>}
                            {!product.isActive && <Hover onClick={() => { ActivateItem(product.product_id) }}>Activate</Hover>}
                            <Delete onClick={() => { DeleteItem(product.product_id) }}>Delete</Delete>
                        </ProductLine>
                    </>
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

const ProductLine = styled.div`{
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

const ProductName = styled.span`{
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

const Loader = styled.div`{
    display: flex;
    justify-content: center;
    height: 1rem;
    width: 100%;
    z-index: 2;
    margin-bottom: 2px;
}`
export default AdminProducts