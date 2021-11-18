import React, { useState } from 'react';
import styled from 'styled-components';
import { AdminMenuSidebarData } from './AdminMenuSidebarData';

const AdminSideBar = (props) => {
    const [sidebar, setSidebar] = useState(false);
    // const showSidebar = () => setSidebar(!sidebar);

    return (
        <div>
            <SidebarNav sidebar={sidebar}>
                <SidebarWrap>
                    {AdminMenuSidebarData.map((item, key) => {
                        return <SidebarCategory key={key}>
                            <hr/>
                        </SidebarCategory>
                    })}
                </SidebarWrap>
            </SidebarNav>
        </div>
    )
}

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
    box-shadow: -4px 20px 13px 0px #00000036;
    overflow-y: scroll;
`;

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
export default AdminSideBar;