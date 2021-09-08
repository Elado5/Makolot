import React, { useState } from 'react';
import styled from 'styled-components';
import { MainMenuSidebarData } from './MainMenuSidebarData';
import MainMenuSub from './MainMenuSub';

const MenuSideBar = (props) => {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

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
        box-shadow: -4px 20px 13px 0px #c6cbdb;
        overflow-y: scroll;
      `;

    return (
        <div>
            <button onClick={showSidebar} className="burger-icon-btn">
                <img className="burger-icon-img" alt="main-menu" src="/images/icons8-menu-256.png" />
            </button>

            <SidebarNav sidebar={sidebar}>
                <div className="sidebar-wrap">
                    {MainMenuSidebarData.map((item, key) => {
                        return <div className="sidebar-category" >
                            <hr />
                            <MainMenuSub item={item} key={key} />
                        </div>
                    })}
                </div>
            </SidebarNav>
        </div>
    )
}
export default MenuSideBar;