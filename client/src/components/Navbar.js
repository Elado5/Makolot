import React, { useState, useEffect } from 'react'
import ShoppingCart from '../components/ShoppingCart';
import MenuSideBar from './MenuSideBar';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { GET } from '../api/fetch';
import { productsAPI } from '../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = (props) => {
    const { addItem, removeItem, completelyRemoveItem, cartItems, setProducts, loggedUser, loggedAdmin } = props;

    // window.onscroll = function() {
    //     var currentScrollPos = window.pageYOffset;
    //     if (prevScrollpos > currentScrollPos) {
    //       document.getElementById("navbar").style.top = "0";
    //     } else {
    //       document.getElementById("navbar").style.top = "-50px";
    //     }
    //     prevScrollpos = currentScrollPos;
    //   }

    //*states
    const [open, setOpen] = useState(true);
    const [searchBox, setSearchBox] = useState('');

    //*Load products by name form API
    const LoadProductsByName = async (name) => {
        let res = await GET(productsAPI.get_by_name_active, [name])
        console.log("products loaded by name: " + res);
        setProducts(res);
    }

    //*Bring back all products to the screen
    const LoadAllProducts = async () => {
        let res = await GET(productsAPI.get_active_products);
        console.log("search bar empty -> loading back all products");
        setProducts(res);
    }

    //*When stuff are written in the box, call the load function
    useEffect(() => {
        if (searchBox === " ") {
            setSearchBox("");
        }
        else if (searchBox !== "") {
            LoadProductsByName(searchBox);
        }
        else {
            LoadAllProducts(); //!doesn't trigger when deleting the text - why?
        }
    }, [searchBox])

    return (
        <NavBar>
            <ContainerLeft>
                <Link to="/">
                    <NavImg alt="logo" src="/images/logo.png" onClick={() => { document.location.href = '/' }} />
                </Link>

                <BtnBasket onClick={() => setOpen(!open)}>
                    <Basket>
                        <BasketIcon alt="basket" src="/images/icons8-shopping-cart-96.png"></BasketIcon>
                        <CounterBasket>
                            {cartItems.length ? (<span> {cartItems.length} </span>) : 0}
                        </CounterBasket>
                    </Basket>
                </BtnBasket>

                {open &&
                    <DropdownShoppingCart>
                        <ShoppingCart cartItems={cartItems} addItem={addItem} removeItem={removeItem} completelyRemoveItem={completelyRemoveItem} open={open} setOpen={setOpen} loggedUser={loggedUser} loggedAdmin={loggedAdmin} />
                    </DropdownShoppingCart>
                }

                <HrNav />
                <Link to={`/about`} onClick={() => setOpen(false)} >אודות העמותה</Link>
                <HrNav />
                <span className="">055-6663999</span>

            </ContainerLeft>

                {window.scrollY < 500 &&
            <ContainerRight>
                <SearchSomeBtn>
                    <SearchSome alt="search" src="/images/icons8-search-500.png" />
                </SearchSomeBtn>

                <InputSearch type="text" placeholder="?מה תרצו למצוא" value={searchBox} onInput={(e) => setSearchBox(e.target.value)} />

            </ContainerRight>
            }
        </NavBar>
    )
}

const ContainerLeft = styled.div`{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5px;
    color: #27407f;
    width: 32em;
    margin-left: 35px;
    font-weight: 500;
}`

const NavImg = styled.img`{
    height: 4em;
}`

const BtnBasket = styled.button`{
    border: none;
    background-color: transparent;
    cursor: pointer;
}`

const Basket = styled.div`{
  margin-left: 60px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}`

const BasketIcon = styled.img`{
    height: 3em;
}`

const CounterBasket = styled.span`{
    background-color: rgb(255 255 255);
    height: 20px;
    z-index: 9;
    position: absolute;
    width: 20px;
    border-radius: 50%;
    box-shadow: 0px 0px 3px #27407f66;
    font-size: smaller;
    font-weight: 400;
    align-items: center;
    justify-content: center;
    display: flex;
}`

const DropdownShoppingCart = styled.div`{
    overflow: hidden;
}`

const HrNav = styled.hr`{
  height: 65px;
  display: inline-block;
  border: 1px solid #00968838;
  width: 0px;
  margin: 17px;
}`

const ContainerRight = styled.div`{
    display: flex;
    align-items: center;
    width: 42%;
    justify-content: space-between;
    margin-right: 35px;
}`

const SearchSomeBtn = styled.button`{
    background-color: #ffffff00;
    border: none;
    height: 4em;
    position: absolute;
    margin-left: 10px;
}`

const SearchSome = styled.img`{
    height: 3em;
}`

const InputSearch = styled.input`{
    height: 4em;
    display: flex;
    align-self: center;
    border: none;
    border-bottom: 2px solid #27407f;
    width: 100%;
    text-align: right;
    font-size: 16px;
    font-weight: bold;
    outline: none;
    color: #27407f;
    background-color: #fafafa;

    &::placeholder{
        color: #27407f;
        font-size: 1.5em;
    }
}`


const NavBar = styled.nav`{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
    background-color: #fafafa;
    position: fixed;
    z-index: 2;
    height: 6em;
    box-shadow: 0px 0px 5px lightgrey; 
    width: max-content;
    @media only screen and (min-width: 900px)  {
        width: 100%;
   }
}`

const Icon = styled.span`{
    font-size: 1.5rem;
}`

const Icons = styled.div`{
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
}`
export default Navbar;