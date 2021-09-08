import React, { useState } from 'react';
import styled from 'styled-components';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';

const Category = (props) => {
    const [sidebar, setSidebar] = useState(true);
    const showSidebar = () => setSidebar(!sidebar);

    const SidebarNav = styled.nav`
        background-color: #fafafa;
        color: #27407f;
        width: 30em;
        height: 100vh;
        display: flex;
        justify-content: center;
        top: 20em;
        right: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
        transition: 350ms;
        z-index: 10;
        overflow-y: scroll;
        padding: 15px;
      `;

    return (
        <div>
            <SidebarNav sidebar={sidebar}>
                <div className="sidebar-wrap">
                    <button onClick={showSidebar}>X</button>

                    {SidebarData.map((item, key) => {
                        return <div className="sidebar-category" >
                            <SubMenu item={item} key={key} />
                        </div>
                    })}
                </div>
            </SidebarNav>
        </div>
    )
}
export default Category;