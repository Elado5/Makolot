import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import UserNavbar from '../components/UserNavbar';
import { customersAPI } from '../api/api';
import { GET, POST, PUT, DELETE } from '../api/fetch';



const UserScreen = () => {

    const loggedUser = JSON.parse(sessionStorage.getItem('currentLoggedIn')) || false;

    const [verified, setVerified] = useState(false);
    const [customer, setCustomer] = useState([]);
    const [customerLoaded, setCustomerLoaded] = useState(false);
    const [loading, setLoading] = useState(false);

    const loadCustomerByID = async (id) => {
        try {
            setLoading(true);
            let res = await GET(customersAPI.get_by_id, [id]);
            if(res){
            setCustomer(res);
            }
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        const veryifyCustomerInfo = async () => {
            if (!loggedUser.customer_email || !loggedUser.customer_password) {
                alert("no user logged in");
                window.location = '/';
            }
            let res = await POST(customersAPI.post_login, { customer_email: loggedUser.customer_email, customer_password: loggedUser.customer_password })
            console.log(res)
            if (!res.customer_password || !res.customer_email) {
                setVerified(false);
                alert("false user detected.")
                window.location = '/';
            }
            else {
                setVerified(true);
            }
        }

        veryifyCustomerInfo();
    }, [])

    useEffect(() => {
        try{
            if(!customerLoaded){
        loadCustomerByID(loggedUser.customer_id);
        setCustomerLoaded(true);
            }
        } catch (err) {
            console.log(err);
        }

    }, [customerLoaded])

    return (
        <>
            {verified &&
                <Container>
                    <UserNavbar user={customer}/>
                    {/*<customerSideBar />*/}
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
export default UserScreen;