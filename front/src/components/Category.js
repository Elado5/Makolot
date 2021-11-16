import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import {categoriesAPI} from '../api/api';
import {GET} from '../api/fetch';


const Category = (props) => {
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
        else{
            console.log("Categories done loading");
        }
    }, [allCategoriesLoaded])

    return (
        <div>
            <SidebarNav sidebar={sidebar}>
                <SidebarWrap>
                    <button onClick={showSidebar}>X</button>
                    {categories.map((category, key) => {
                        return <SidebarCategory key={key}>
                            <SubMenu item={category} />
                        </SidebarCategory>
                    })}
                </SidebarWrap>
            </SidebarNav>
        </div>
    )
}

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
export default Category;