import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { customersAPI } from '../api/api';
import { GET, POST } from '../api/fetch';
import { BeatLoader } from 'react-spinners';


const PopUpLogin = (props) => {

    //* get currently logged in user if it exists
    const loggedAdmin = JSON.parse(sessionStorage.getItem('adminLoggedIn')) || false;
    //* get currently logged in user if it exists
    const loggedUser = JSON.parse(sessionStorage.getItem('currentLoggedIn')) || false;

    const [email, setEmail] = useState('');
    const [pass, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    if (loggedUser || loggedAdmin) {
        //* if a user is already logged in - redirect to main page 
        return (<Redirect to='/' />);
    }

    const LoginCustomer = async (email, password) => {
        setLoading(true);
        let res = await POST(customersAPI.post_login, { customer_email: email, customer_password: password });

        if (res.customer_email && res.customer_password) {
            setLoading(false);
            alert("login succesful.")
            sessionStorage.setItem(`currentLoggedIn`, JSON.stringify(res));
            window.location = '/';
        }
        else {
            setLoading(false);
            alert("login failed - email or password do not exist.")
        }
        //TODO login stuff
    }

    const submitFunc = (event) => {
        event.preventDefault();
        console.log("log user:" + email, pass)
        if (/([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4})$/.test(email) === false) {
            alert('Please enter a valid email address and try again.')
        }
        else if (/^((?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,})$/.test(pass) === false) {
            alert('Please enter a valid password and try again.')
        }
        else {
            LoginCustomer(email, pass);
        }
    }

    return (
        <form onSubmit={submitFunc}>
            <ContainerPopup>
                <PopupLog>
                    <Link className="close-button" to="/">X</Link>
                    <PopupLogArea>
                        <PopupLogAreaSpan >??????????????</PopupLogAreaSpan>
                        <PopupLogInputs>
                            <InputsReg>
                                <div>
                                    <PopupLogAreaInput onChange={event => setEmail(event.target.value)}
                                        type="text" id="user_email" placeholder="???????? ????????????????" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" />
                                    <InputMustSpan>*</InputMustSpan>
                                </div>

                                <div>
                                    <PopupLogAreaInput onChange={event => setPassword(event.target.value)}
                                        type="password" id="user_pass" placeholder="??????????" />
                                    <InputMustSpan>*</InputMustSpan>
                                </div>
                                {/* {error && <div className="error-input">{error}</div>} */}
                                {loading &&
                                    <Loader>
                                        <BeatLoader color='navy' loading />
                                    </Loader>
                                }
                            </InputsReg>

                            <InputLinksArea>
                                <Link to={"/forgot"}> ????????? ???? ???????????? </Link>
                                <Link to={"/register"}> ??????????? ?????? </Link>

                                <BtnDefault type="submit" onClick={submitFunc}>??????????</BtnDefault>
                            </InputLinksArea>
                        </PopupLogInputs>
                    </PopupLogArea>
                </PopupLog>
            </ContainerPopup>
        </form>
    )
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
    backdrop-filter: blur(2px);
}`

const PopupLog = styled.div`{
    background-color: white;
    border-radius: 3em;
    width: 39%;
    display: flex;
    flex-direction: column;
    align-items: center;
}`

const PopupLogArea = styled.div`{
    margin-bottom: 40px;
    height: 26em;
    text-align: center;
}`

const PopupLogAreaInput = styled.input`{
    text-align: right;
    margin: 4%;
    border: none;
    border-bottom: 1px solid #27407f;
    height: 3em;
    outline: none;
    width: 90%;
    color: #27407f;
    font-weight: bold;
}`

const PopupLogAreaSpan = styled.span`{
    color: #27407f;
    font-size: 30px;
    font-weight: 600;
}`

const PopupLogInputs = styled.div`{
    display: flex;
    flex-direction: column;
    width: 42em;
    height: 85%;
    justify-content: space-between;
    align-items: center;
}`

const InputsReg = styled.div`{
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 15px;
}`

const InputMustSpan = styled.span`{
    color: red;
    font-size: 23px;
}`

const InputLinksArea = styled.div`{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}`

const BtnDefault = styled.button`{
    background-color: #27407f;
    color: aliceblue;
    border: none;
    border-radius: 25px;
    height: 2.5em;
    width: 10em;
    font-family: system-ui;
    cursor: pointer;
}`

const Loader = styled.div`{
    display: flex;
    justify-content: center;
    width: 100%;
    z-index: 2;
}`


export default PopUpLogin;