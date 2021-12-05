import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AdminSideBar from '../components/admin/AdminSideBar';
import AdminNavbar from '../components/admin/AdminNavbar';
import { adminsAPI } from '../api/api';
import { productsAPI } from '../api/api';
import { GET, POST, PUT, DELETE } from '../api/fetch';



const AdminHomeScreen = () => {

    const [verified, setVerified] = useState(false);
    const loggedAdmin = JSON.parse(sessionStorage.getItem('adminLoggedIn')) || false;


    const [products, setProducts] = useState([]);
    const [productsLoaded, setProductsLoaded] = useState(false);

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
            let res = await PUT(productsAPI.put_activate, [id]);
            loadProducts(res);
        }
        catch (err) {
            console.error(`err`, err)
        }
    }

    const DeactivateItem = async (id) => {
        try {
            let res = await PUT(productsAPI.put_deactivate, [id]);
            loadProducts(res);
        }
        catch (err) {
            console.error(`err`, err)
        }
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


    useEffect(() => {
        const veryifyAdminInfo = async (admin) => {
            if (!loggedAdmin.admin_email || !loggedAdmin.admin_password) {
                alert("no admin logged in");
                window.location = '/';
            }
            let res = await POST(adminsAPI.post_login, { admin_email: loggedAdmin.admin_email, admin_password: loggedAdmin.admin_password })
            console.log(res)
            if (!res.admin_password || !res.admin_email) {
                setVerified(false);
                alert("false admin detected.")
                window.location = '/';
            }
            else {
                setVerified(true);
            }
        }

        veryifyAdminInfo();
    })

    /*
    {products && products.map((product, key) => {
        return (
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
        )
    })}
    */

    return (
        <>
            {verified &&
                <Container>
                    <AdminNavbar products={products} load_products={loadProductsByName} />
                    <AdminSideBar />
                    <PContainer>
                    </PContainer>
                    )
                </Container>
            }
        </>
    )
}

const Container = styled.div`{
    position: fixed;
    height: 100vh;
    width: 100%;
    overflow: scroll;
    backdrop-filter: blur(50px);
    background-image: url("/images/adminBG.jpg");
    background-size: cover;
    background-repeat: no-repeat;
}`

const ManagementSection = styled.div`{
    position: fixed;
    z-index: 5;
    top: 22%;
    left: 12%;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
    width: 80vh;
    border: 1px solid black;
}`


const PContainer = styled.div`{
    display: flex;
    flex-direction: column;
    position: fixed;
    justify-content: center;
    align-items: center;
    z-index: 3;
    left: 17%;
    top: 12%;
    width: 75vh;
    box-shadow: 0px 0px 13px black;
    backdrop-filter: blur(10px);
}`

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
export default AdminHomeScreen;