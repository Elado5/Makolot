import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {sub_categoriesAPI} from '../api/api';
import {GET} from '../api/fetch';

const MainMenuSub = ({ category }) => {
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);

  const [subCategories1, setSubCategories1] = useState([]);
  
  const LoadSubCategories = async (id) => {
    let res = await GET(sub_categoriesAPI.get_by_category_id, [id]);
    console.log("subcat ---> ", res)
    setSubCategories1(res);
  }

  // useEffect(() =>{
  //   LoadSubCategories()
  // }, [])

  //item.path -- item.subNav
  return (
    <div>
      <div to="/" onClick={category.subNav && showSubnav}> 
        <CategorySection>
          {!subnav && <DropImgClose alt="dropdown-menu-when-close" src="/images/icons8-chevron-left-96.png" />}
          {subnav && <DropImgOpen alt="dropdown-menu-when-open" src="/images/icons8-expand-arrow-96.png" />}
          <SidebarLabel>{category.category_name}</SidebarLabel>
        </CategorySection>
        <div>
          {subCategories1 && subnav ? category.iconOpened : subCategories1 ? category.iconClosed : null}
        </div>
      </div>
      {subnav && subCategories1.map((category, key) => { //item.subNav.map    -in dropdownling:to={item.path}
        return (
          <DropdownLink to="/" key={key}> 
            <SidebarLabel>{category.sub_category_name}</SidebarLabel>
          </DropdownLink>
        );
      })}
    </div>
  )
}

const CategorySection = styled.div`{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}`

const DropImgClose = styled.img`{
  height: 2em;
}`

const DropImgOpen = styled.img`{
  height: 3em;
}`

const DropdownLink = styled.a`{
  height: 60px;
  padding-left: 3rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-decoration: none;
  color: #27407f;
  font-size: 18px;
  transition: 3s;

  &:hover{
  color: #27407f;
  font-size: 20px;
  cursor: pointer;
  }
}`

const SidebarLabel = styled.div`{
  margin-left: 16px;
  font-size: 20px;
}`
export default MainMenuSub;