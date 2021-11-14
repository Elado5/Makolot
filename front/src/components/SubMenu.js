import React, { useState } from 'react';
import styled from 'styled-components';
import {sub_categoriesAPI} from '../api/api';
import {GET} from '../api/fetch';

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);


  const LoadSubCategory = (id) => {
   let res = GET(sub_categoriesAPI.get_by_category_id, [id]);
   return res; 
  }

  // const [subnav1, setSubnav1] = useState([]);
  // const [subnav2, setSubnav2] = useState([]);
  // const [subnav3, setSubnav3] = useState([]);
  // const [subnav4, setSubnav4] = useState([]);
  // const [subnav5, setSubnav5] = useState([]);
  // const [subnav6, setSubnav6] = useState([]);
  // const [subnav7, setSubnav7] = useState([]);
  // const [subnav8, setSubnav8] = useState([]);
  // const [subnav9, setSubnav9] = useState([]);

  return (
    <div>
      <div to={item.path} onClick={item.subNav && showSubnav}>
        <hr />
        
        <CategorySection>
          {!subnav && <DropImgClose alt="dropdown-menu-when-close" src="/images/icons8-chevron-left-96.png" />}
          {subnav && <DropImgOpen alt="dropdown-menu-when-open" src="/images/icons8-expand-arrow-96.png" />}

          <TitleIconSection>
            <div>{item.category_name}</div>
            <CategoryIcon alt="icon-category" src={item.category_image} />
          </TitleIconSection>

        </CategorySection>
        <div>
          {item.subNav && subnav ? item.iconOpened
            : item.subNav ? item.iconClosed : null}
        </div>
      </div>
      {subnav && item.subNav.map((item, key) => {
        return (
          <DropdownLink href={item.path} key={key}>
            {item.icon}
            <SidebarLabel>{item.title}</SidebarLabel>
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