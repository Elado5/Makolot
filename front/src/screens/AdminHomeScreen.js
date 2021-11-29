import React, {useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import AdminSideBar from '../components/AdminSideBar';
import { POST } from '../api/fetch';
import { adminsAPI } from '../api/api';


const AdminHomeScreen = () => {

    const [verified, setVerified] = useState(false);
    const loggedAdmin = JSON.parse(sessionStorage.getItem('adminLoggedIn')) || false;

    if (!loggedAdmin.admin_email || !loggedAdmin.admin_password) {
        alert("!!")
        //return <Redirect to="/" />
    }

    useEffect(() => {
        const veryifyAdminInfo = async (admin) => {
            let res = await POST(adminsAPI.post_login, { admin_email: loggedAdmin.admin_email, admin_password: loggedAdmin.admin_password })
            console.log(res)
            if (!res.admin_password || !res.admin_email) {
                setVerified(false);
                alert("false admin detected.")
                window.location = '/';
            }
            else{
                setVerified(true);
            }
        }

        veryifyAdminInfo();
    })


    return (
        <>
        {verified &&
        <Container>
            <div>
                <div> Nav admin </div>
                <div>
                    <div>Data section</div>

                    <div>Nav panel admin
                        <AdminSideBar></AdminSideBar>
                    </div>

                </div>
            </div>
        </Container>
        }
        </>
    )
}

const Container = styled.div`{
    position: fixed;
    z-index: 4;
    background-color: #fafafa;
    height: 100vh;
    width: 100%;
    overflow: scroll;
}`

export default AdminHomeScreen;