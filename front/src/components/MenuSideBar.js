import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MainMenuSidebarData } from './MainMenuSidebarData';
import {categoriesAPI} from '../api/api';
import {GET} from '../api/fetch';
import MainMenuSub from './MainMenuSub';

const MenuSideBar = (props) => {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const [categories, setCategories] = useState([]);
    const [allCategoriesLoaded, setAllCategoriesLoaded] = useState(false); 


    const LoadCategories = async () => {
        let res = await GET(categoriesAPI.get_all);
        console.log("Subnav categ res ---", res)
        setCategories(res);
    }
    
    //*Making sure the 'products' state is loaded ONCE.
    useEffect(() => {
        if (!allCategoriesLoaded) {
                LoadCategories();
                console.log("Subnav Categ loaded!");
                setAllCategoriesLoaded(true);
        }
        else{
            console.log("Subnav Categ done loading");
        }
    }, [allCategoriesLoaded])

    return (
        <div>
            <BurgerIconBtn onClick={showSidebar}>
                <BurgerIconImg alt="main-menu" src="/images/icons8-menu-256.png" />
            </BurgerIconBtn>

            <SidebarNav sidebar={sidebar}>
                <SidebarWrap>
                    {categories.map((category, key) => {
                        return <SidebarCategory key={key}>
                            <hr />
                            <MainMenuSub category={category} />
                        </SidebarCategory>
                    })}
                </SidebarWrap>
            </SidebarNav>
        </div>
    )
}

const SidebarNav = styled.nav`
    background-color: #fafafa;
    color: #27407f;
    width: 30em;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 4em;
    right: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
    transition: 350ms;
    z-index: 10;
    padding; 10px;
    box-shadow: -4px 20px 13px 0px #00000036;
    overflow-y: scroll;
`;

const SidebarWrap = styled.div`{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 25px;
}`

const SidebarCategory = styled.div`{
    width: 100%;
    text-align: right;
}`

const BurgerIconBtn = styled.button`{
    height: 4em;
    background-color: transparent;
    border: none;
    outline: none;
    margin-left: 15px;
}`

const BurgerIconImg = styled.img`{
    height: 2em;
}`
export default MenuSideBar;