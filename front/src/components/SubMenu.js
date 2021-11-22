import React, { useState } from 'react';
import styled from 'styled-components';
import { productsAPI } from '../api/api';
import { GET } from '../api/fetch';

const SubMenu = ({ item, setProductsState }) => {
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);

  const LoadProductsFromSubCategory = async (id) => {
    let res = await GET(productsAPI.get_by_sub_category, [id]);
    setProductsState(res);
  }

  const LoadProductsFromCategory = async (id) => {
    let res = await GET(productsAPI.get_by_category, [id]);
    setProductsState(res);
  }

  return (
    <div>
      <div to={item.path} onClick={item.sub_categories && showSubnav}>
        <hr />

        <CategorySection>
          {!subnav &&  <DropImgClose alt="dropdown-menu-when-close" src="/images/icons8-chevron-left-96.png" />}
          {subnav && <DropImgOpen alt="dropdown-menu-when-open" src="/images/icons8-expand-arrow-96.png" />}

          <TitleIconSection>
            <CategoryName onClick={() => {LoadProductsFromCategory(item.category_id)}}> {item.category_name} </CategoryName>
            <CategoryIcon alt="icon-category" src={item.category_image} />
          </TitleIconSection>

        </CategorySection>
        <div>
          {subnav && item.sub_categories ? item.iconOpened : item.sub_categories ? item.iconClosed : null}
        </div>
      </div>
      {subnav && item.sub_categories.map((sub, key) => {
        return (
          <DropdownLink onClick={() => {LoadProductsFromSubCategory(sub.sub_category_id)}} key={key}>
            <SidebarLabel>{sub.sub_category_name}</SidebarLabel>
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

const CategoryName = styled.div`{
  cursor: pointer;
  font-weight: bold;
  font-size: 17px;
  :hover {
    text-decoration: underline;
}
}`

const DropImgClose = styled.img`{
  height: 2em;
  cursor: pointer;
  :hover {
  font-size:1.1rem;
  transition: 0.5s ease-out;
}
}`

const DropImgOpen = styled.img`{
  height: 3em;
  cursor: pointer;
  :hover {
    font-size:1.1rem;
    transition: 0.5s ease-out;
  }
}`

const TitleIconSection = styled.div`{
  width: 15em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}`

const CategoryIcon = styled.img`{
  height: 3em;
  cursor: pointer;
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
  font-size: 18px;
  :hover {
    text-decoration: underline;
    font-weight: 500;
}
}`

export default SubMenu;