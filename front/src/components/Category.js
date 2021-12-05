import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { categoriesAPI } from '../api/api';
import { GET } from '../api/fetch';


const Category = ({ setProductsState, loadProducts }) => {
    const [sidebar, setSidebar] = useState(true);
    const showSidebar = () => setSidebar(!sidebar);
    const [categories, setCategories] = useState([]);
    const [allCategoriesLoaded, setAllCategoriesLoaded] = useState(false);

    const LoadCategories = async () => {
        let res = await GET(categoriesAPI.get_all);
        setCategories(res);
    }

    //*Making sure the 'products' state is loaded ONCE.
    useEffect(() => {
        if (!allCategoriesLoaded) {
            LoadCategories();
            setAllCategoriesLoaded(true);
        }
        else {
            console.log("Categories done loading");
        }
    }, [allCategoriesLoaded])

    return (
        <div>
            {!sidebar && <Button onClick={showSidebar}>הצג קטגוריות</Button>}
            {sidebar && <SidebarNav sidebar={sidebar}>
                <SidebarWrap>
                    <Button2 onClick={showSidebar}>הסתר קטגוריות</Button2>
                    <ReloadProducts onClick={loadProducts}>
                        כל המוצרים
                    </ReloadProducts>
                    {categories.map && categories.map((category, key) => {
                        return <SidebarCategory key={key}>
                            <SubMenu item={category} setProductsState={setProductsState} />
                        </SidebarCategory>
                    })}
                </SidebarWrap>
            </SidebarNav>
            }
        </div>
    )
}

const Button = styled.button`{
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30%;
    height: 3rem;
    width: 3rem;
    margin: 0.755rem;
    font-size: 0.65rem;
    box-shadow: 0px 0px 3px grey;
    position: relative;
    &:hover{
        transition: 0.5s ease;
        box-shadow: 0px 0px 3px black;
    }
}`;
const Button2 = styled.button`{
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30%;
    height: 3rem;
    width: 3rem;
    font-size: 0.65rem;
    padding: 1rem;
    box-shadow: 0px 0px 3px grey;
    position: relative;
    &:hover{
        transition: 0.5s ease;
        box-shadow: 0px 0px 3px black;
    }
}`;

const SidebarNav = styled.nav`{
    background-color: #fafafa;
    color: #27407f;
    width: 30em;
    height: 100vh;
    display: flex;
    justify-content: center;
    right: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
    transition: 0.5s;
    z-index: 10;
    overflow-y: scroll;
    padding: 15px;
}`;

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

const ReloadProducts = styled.div`{
    display: flex;
    cursor: pointer;
    justify-content: center;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.3);
    font-weight: bold;
    width: 100%;
    color: #27407f;
    padding: 0.5rem;
    margin-top: 1rem;
    border-radius: 2rem;
    :hover {
        transition: 0.5s ease;
        background-color: rgba(0, 145, 355, 0.15);
    }
}`
export default Category;