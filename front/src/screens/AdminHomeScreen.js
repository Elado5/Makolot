import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AdminNavbar from '../components/admin/AdminNavbar';
import { adminsAPI } from '../api/api';
import { productsAPI } from '../api/api';
import { GET, POST, PUT, DELETE } from '../api/fetch';



const AdminHomeScreen = () => {

    const [verified, setVerified] = useState(false);
    const loggedAdmin = JSON.parse(sessionStorage.getItem('adminLoggedIn')) || false;

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
                    <AdminNavbar />
                    <PContainer>
                    </PContainer>
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
    background-image: url("/images/customerBG.png");
    background-size: cover;
    background-repeat: no-repeat;
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

export default AdminHomeScreen;