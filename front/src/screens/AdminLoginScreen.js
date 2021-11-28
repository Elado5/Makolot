import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { adminsAPI } from '../api/api';
import { POST } from '../api/fetch';

const AdminLogin = () => {

    //* get currently logged in user if it exists
    const loggedAdmin = JSON.parse(sessionStorage.getItem('adminLoggedIn')) || false;

    const [email, setEmail] = useState('');
    const [pass, setPassword] = useState('');

    if (loggedAdmin) {
        //* if a user is already logged in - redirect to main page 
        return (<Redirect to='/' />);
    }

    const LoginAdmin = async (email, password) => {
        let res = await POST(adminsAPI.post_login, { admin_email: email, admin_password: password });
        //תנאי התחברות?
        console.log(res);

        if (res.admin_email && res.admin_password) {
            alert("login succesful.")
            sessionStorage.setItem(`adminLoggedIn`, JSON.stringify(res));
            window.location = '/adminPage';
        }
        else {
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
            LoginAdmin(email, pass);
        }
    }




    // useEffect(() => {
    //     if (userData) {
    //         props.history.push(link);
    //     }
    // }, [userData, props.history, link]);

    return (
        <form onSubmit={submitFunc}>
            <ContainerPopup>
                <PopupLog>
                    <Link className="close-button" to="/">X</Link>
                    <PopupLogArea>
                        <PopupLogAreaSpan >התחברות אדמין</PopupLogAreaSpan>

                        <PopupLogInputs>
                            <InputsReg>
                                <div>
                                    <PopupLogAreaInput onChange={event => setEmail(event.target.value)}
                                        type="text" id="user_email" placeholder="דואר אלקטרוני" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" />
                                    <InputMustSpan>*</InputMustSpan>
                                </div>

                                <div>
                                    <PopupLogAreaInput onChange={event => setPassword(event.target.value)}
                                        type="password" id="user_pass" placeholder="סיסמה" />
                                    <InputMustSpan>*</InputMustSpan>
                                </div>
                                {/* {error && <div className="error-input">{error}</div>} */}
                            </InputsReg>

                            <InputLinksArea>

                                <BtnDefault type="submit" onClick={submitFunc}>התחבר</BtnDefault>
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
    font-weight: 800;
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

export default AdminLogin;