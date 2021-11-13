import React, { useState } from 'react';
import styled from 'styled-components';
import {sub_categoriesAPI} from '../api/api';
import {GET} from '../api/fetch';
//'category' comes from Category.js


const SubMenu = ({ category }) => {
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);


  const LoadSubCategory = (id) => {
   let res = GET(sub_categoriesAPI.get_by_category_id, [id]);
   return res; 
  }

  //TODO - load subcategory by category id for each category and replace the subnav with proper info from the subcategory
  //? shall it be done in the onclick?
/*
  const [subnav1, setSubnav1] = useState([]);
  const [subnav2, setSubnav2] = useState([]);
  const [subnav3, setSubnav3] = useState([]);
  const [subnav4, setSubnav4] = useState([]);
  const [subnav5, setSubnav5] = useState([]);
  const [subnav6, setSubnav6] = useState([]);
  const [subnav7, setSubnav7] = useState([]);
  const [subnav8, setSubnav8] = useState([]);
  const [subnav9, setSubnav9] = useState([]);
*/

  return (
    <div>
      <div to={category.path} onClick={category.subNav && showSubnav}>
        <hr />
        
        <CategorySection>
          {!subnav && <DropImgClose alt="dropdown-menu-when-close" src="/images/icons8-chevron-left-96.png" />}
          {subnav && <DropImgOpen alt="dropdown-menu-when-open" src="/images/icons8-expand-arrow-96.png" />}

          <TitleIconSection>
            <div>{category.category_name}</div>
            <CategoryIcon alt="icon-category" src={category.category_image} />
          </TitleIconSection>

        </CategorySection>
        <div>
          {category.subNav && subnav ? category.iconOpened
            : category.subNav ? category.iconClosed : null}
        </div>
      </div>
      {subnav && category.subNav.map((category, key) => {
        return (
          <DropdownLink href={category.path} key={key}>
            {category.icon}
            <SidebarLabel>{category.title}</SidebarLabel>
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

const TitleIconSection = styled.div`{
  width: 15em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}`

const CategoryIcon = styled.img`{
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

export default SubMenu;