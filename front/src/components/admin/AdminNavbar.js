import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {AdminMenuSidebarData} from './AdminMenuSidebarData';


const AdminNavbar = ({ products, load_products }) => {
	//*states
	const [searchBox, setSearchBox] = useState("");

	//*When stuff are written in the box, call the load function
	useEffect(
		() => {
			if (searchBox === " ") {
				setSearchBox("");
			}
			else if (searchBox.length > 0) {
				load_products(searchBox);
			}
		},
		[searchBox]
	);

	return (
		<Nav>
			<Container>
				<Link to="/adminPage">
					<NavImg
						alt="logo"
						src="/images/logo.png"
					/>
				</Link>
				{AdminMenuSidebarData.map((item, key) =>
					<>
						<HrNav />
						<Link to={item.path} key={key}>{item.title}</Link>
					</>
				)}
			</Container>
		</Nav>
	);
};

const Nav = styled.nav`
	 {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-content: center;
		background-image: linear-gradient(rgba(115, 185, 255, 0.9),white, rgba(55, 65, 85, 0.8));
		background-color: white;
		position: fixed;
		width: 100%;
		z-index: 6;
		height: 6em;
	}
`;

const Container = styled.div`
	 {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 5px;
		color: navy;
		width: 100%;
		margin-left: 35px;
		font-weight: 500;
		font-size: 1.3rem;
		text-shadow: 0 1px 2px rgba(255, 255, 255, 1);
	}
`;

const NavImg = styled.img`
	 {
		height: 4em;
	}
`;

const HrNav = styled.hr`
	 {
		height: 65px;
		display: inline-block;
		border: 1px solid #00968838;
		width: 0px;
		margin: 17px;
	}
`;
export default AdminNavbar;
