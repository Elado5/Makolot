import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MainMenuSub = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);

  return (
    <div>
      <div to={item.path} onClick={item.subNav && showSubnav}>
        <CategorySection>
          {!subnav && <DropImgClose alt="dropdown-menu-when-close" src="/images/icons8-chevron-left-96.png" />}
          {subnav && <DropImgOpen alt="dropdown-menu-when-open" src="/images/icons8-expand-arrow-96.png" />}
          <SidebarLabel>{item.title}</SidebarLabel>
        </CategorySection>
        <div>
          {item.subNav && subnav ? item.iconOpened : item.subNav ? item.iconClosed : null}
        </div>
      </div>
      {subnav && item.subNav.map((item, key) => {
        return (
          <DropdownLink to={item.path} key={key}>
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