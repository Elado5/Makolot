import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AdminNavbar from '../components/admin/AdminNavbar';
import { adminsAPI } from '../api/api';
import { GET, POST, PUT, DELETE } from '../api/fetch';



const AdminHomeScreen = () => {

    const [verified, setVerified] = useState(false);
    const [loggedAdmin, setLoggedAdmin] = useState(JSON.parse(sessionStorage.getItem('adminLoggedIn')) || false);

    const veryifyAdminInfo = async () => {
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

    useEffect(() => {
        veryifyAdminInfo();
    }, [verified]) //if i remove the condition it gives me header error sometimes

    return (
        <>
            {verified &&
                <Container>
                    <AdminNavbar />
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

export default AdminHomeScreen;