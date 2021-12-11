import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { productsAPI } from '../../api/api';
import { GET, POST, PUT, DELETE } from '../../api/fetch';
import { BeatLoader } from 'react-spinners';


const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [productsLoaded, setProductsLoaded] = useState(false);
    const [load, setLoad] = useState(false);
    const [serachValue, setSerachValue] = useState('');

    const loadProductsByName = async (name) => {
        try {
            setLoad(true);
            let res = await GET(productsAPI.get_by_name, [name]);
            console.log(res);
            if (res && res.length > 0)
                setProducts(res);
        }
        catch (err) {
            console.error(err);
        }
        setLoad(false);

    }

    const loadProducts = async () => {
        let res = await GET(productsAPI.get_all);
        setProducts(res);
    }

    const ActivateItem = async (id) => {
        try {
            setLoad(true);
            let res = await PUT(productsAPI.put_activate, [id]);
            loadProducts(res);
        }
        catch (err) {
            console.error(`err`, err)
        }
        setLoad(false);
    }

    const DeactivateItem = async (id) => {
        try {
            setLoad(true);
            let res = await PUT(productsAPI.put_deactivate, [id]);
            loadProducts(res);
        }
        catch (err) {
            console.error(`err`, err)
        }
        setLoad(false);
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
            <InputSearch type="text" placeholder="חיפוש מוצר" onChange={(e) => setSerachValue(e.target.value)}>
            </InputSearch>
            <ActionButton onClick={() => loadProductsByName(serachValue)}>חפש מוצר</ActionButton>
            <ActionButton onClick={() => loadProducts()}>טען את כל המוצרים</ActionButton>
            <Link to={`/adminPage/products/add`}>
                <ActionButton>הוסף מוצר</ActionButton>
            </Link>


            {load &&
                <Loader>
                    <BeatLoader color='teal' loading />
                </Loader>
            }
            {products.length === 0 &&
                <Loader>
                    <BeatLoader color='navy' loading />
                </Loader>
            }
            {products.length > 0 && products.map((product, key) => {
                return (
                    <>
                        <ProductLine>
                            <Key>{key+1}</Key>
                            <span><img src={product.product_image} alt={product.product_name} /></span>
                            <ProductName>{product.product_name}</ProductName>
                            {product.isActive && <Active>ACTIVE</Active>}
                            {!product.isActive && <Inactive>INACTIVE</Inactive>}
                            <ProductName><Link to={`/adminPage/product/${product.product_id}`}>Update</Link></ProductName>
                            <ProductName><Link to={
                                {
                                    pathname: `/adminPage/product/${product.product_id}/image`,
                                    state: { id: product.product_id }
                                }
                            }
                            >Update Image</Link></ProductName>

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
const ActionButton = styled.button`{
    cursor: pointer;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    height: 3em;
    width:15rem;
    border-radius: 1rem;
    background-color: rgba(255, 255, 255, 0.7);
    font-weight: bold;
    color: #27407f;
    :hover{
        background-color: rgba(175, 255, 255, 0.5)
    }
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
        margin-bottom: 1rem;

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
    box-shadow: 0px 0px 4px black;
    height: 6em;
    width: 75vh;
    font-size: 1.05rem;
    background-color: rgba(235, 235, 255, 0.85);
    img{
        width: 3rem;
        height: 1rem:
        justify-content: left;
    }
    span{
        width: 100%;
        text-overflow: ellipsis;
    }

}`

const Key = styled.span`{
    font-size: 1.4rem;
    font-weight: 500;
    color: rgba(0, 0, 80, 0.8);
}`

const InputSearch = styled.input`{
    height: 4em;
    width: 35rem;
    margin-bottom: 1rem;
    display: flex;
    align-self: center;
    border: none;
    border-bottom: 2px solid #27407f;
    text-align: right;
    font-size: 16px;
    font-weight: bold;
    outline: none;
    color: #27407f;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 1rem;

    &::placeholder{
        color: #27407f;
        font-size: 1.5em;
        text-shadow: 0px 0px 5px white;
    }
}`

const ProductName = styled.span`{
    text-align: center;
    color: rgba(10, 30, 50, 1);
}`

const Active = styled.span`{
    text-align: center;
    color: green;
    padding-left: 0.5rem;
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