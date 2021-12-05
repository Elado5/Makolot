import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { customersAPI } from '../../api/api';
import { GET, DELETE } from '../../api/fetch';

const AdminCustomers = () => {

    const [customers, setCustomers] = useState([]);
    const [customersLoaded, setCustomersLoaded] = useState(false);

    const loadCustomers = async () => {
        let res = await GET(customersAPI.get_all);
        setCustomers(res);
    }

    const DeleteItem = async (id) => {
        try {
            let choice = window.confirm('Are you sure you want to delete this item?');
            if (choice) {
                let res = await DELETE(customersAPI.delete_customer, [id]);
                loadCustomers(res);
            }
            else {
                alert('The Customer was not deleted.')
            }
        }
        catch (err) {
            console.error(`err`, err)
        }
    }

    //*Making sure the 'customers' state is loaded ONCE.
    useEffect(() => {
        if (!customersLoaded) {
            loadCustomers();
            setCustomersLoaded(true);
        }
        else {
            console.log(`Customers Loaded:`, customersLoaded)
        }
    }, [customersLoaded])


    return (
        <>
            <PContainer>
                <Link to="/adminPage">
                    <ClosePopup>x</ClosePopup>
                </Link>
                <Title>ניהול משתמשים</Title>
                {customers.length > 0 && customers.map((Customer, key) => {
                    return (
                        <>
                            <CustomerLine>
                                <span>{key}</span>
                                <CustomerName>{Customer.customer_first_name} {Customer.customer_last_name}</CustomerName>
                                <CustomerName><Link to={`/adminPage/Customer/${Customer.Customer_id}`}>Update</Link></CustomerName>
                                <Delete onClick={() => { DeleteItem(Customer.Customer_id) }}>Delete</Delete>
                            </CustomerLine>
                        </>
                    )
                })}
            </PContainer>
            )
        </>
    )
}

const PContainer = styled.div`{
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: center;
    align-items: center;
    z-index: 3;
    box-shadow: 0px 0px 13px black;
    backdrop-filter: blur(5px);
    overflow-y:scroll;
    overflow-x:hidden;
    width: 100%;
    padding-top: 5rem;
    overflow-y: scroll;
}`

const CustomerLine = styled.div`{
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

const CustomerName = styled.span`{
    text-align: center;
    padding-right: 1rem;
    color: rgba(10, 30, 50, 1);
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

const Delete = styled.span`{
    color: darkred;
    cursor: pointer;
    text-align: center;
    :hover{
        text-decoration: underline;
    }
}`

export default AdminCustomers;