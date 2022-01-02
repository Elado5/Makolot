import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { customersAPI } from '../../api/api';
import { GET, DELETE } from '../../api/fetch';
import { BeatLoader } from 'react-spinners';

const AdminCustomers = () => {

    const [customers, setCustomers] = useState([]);
    const [customersLoaded, setCustomersLoaded] = useState(false);
    const [load, setLoad] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const loadCustomersByName = async (name) => {
        try {
        setLoad(true);
        console.log(`name`, name)
        let res = await GET(customersAPI.get_by_name, [name]);
        console.log(`res name`, res);
        setCustomers(res);}
        catch (err) {
            console.error(err);
        }
        setLoad(false);
    }

    const loadCustomers = async () => {
        setLoad(true);
        let res = await GET(customersAPI.get_all);
        setCustomers(res);
        setLoad(false);
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
            setLoad(true);
            loadCustomers();
            setCustomersLoaded(true);
            setLoad(false);
        }
        else {
            console.log(`Customers Loaded:`, load)
        }
    }, [customersLoaded])


    return (
        <>
            <PContainer>
                <Link to="/adminPage">
                    <ClosePopup>x</ClosePopup>
                </Link>
                <Title>ניהול משתמשים</Title>
                <InputSearch type="text" placeholder="חיפוש משתמש" onChange={(e) => setSearchValue(e.target.value)}>
                </InputSearch>
                <SearchSome onClick={() => loadCustomersByName(searchValue)}>חפש משתמשים</SearchSome>
                <SearchSome onClick={() => loadCustomers()}>כל המשתמשים</SearchSome>

                {load &&
                    <Loader>
                        <BeatLoader color='teal' loading />
                    </Loader>
                }
                {customers.length === 0 &&
                    <Loader>
                        <BeatLoader color='navy' loading />
                    </Loader>
                }
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

const Loader = styled.div`{
    display: flex;
    justify-content: center;
    height: 1rem;
    width: 100%;
    z-index: 2;
    margin-bottom: 2px;
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


const SearchSome = styled.button`{
    cursor: pointer;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    height: 3em;
    width:15rem;
    border-radius: 1rem;
    background-color: rgba(255, 255, 255, 0.7);
    :hover{
        background-color: rgba(175, 255, 255, 0.5)
    }
}`

export default AdminCustomers;