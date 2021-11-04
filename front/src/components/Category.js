import React, { useState } from 'react';
import styled from 'styled-components';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';

const Category = (props) => {
    const [sidebar, setSidebar] = useState(true);
    const showSidebar = () => setSidebar(!sidebar);

    return (
        <div>
            <SidebarNav sidebar={sidebar}>
                <SidebarWrap>
                    <button onClick={showSidebar}>X</button>
                    {SidebarData.map((item, key) => {
                        return <SidebarCategory key={key}>
                            <SubMenu item={item} />
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