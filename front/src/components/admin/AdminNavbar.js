import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import {Link} from 'react-router-dom';


const AdminNavbar = ({products, load_products}) => {
	//*states
	const [ searchBox, setSearchBox ] = useState("");

	//*When stuff are written in the box, call the load function
	useEffect(
		() => {
			if (searchBox === " ") {
				setSearchBox("");
			}
			else if(searchBox.length > 0){
				load_products(searchBox);
			}
		},
		[ searchBox ]
	);

	return (
		<Nav>
			<ContainerLeft>
				<Link to="/adminPage">
					<NavImg
						alt="logo"
						src="/images/logo.png"
					/>
				</Link>

				<HrNav />
				<span className="">אודות העמותה</span>
				<HrNav />
				<span className="">055-6663999</span>
			</ContainerLeft>

			<ContainerRight>
				<SearchSomeBtn>
					<SearchSome alt="search" src="/images/icons8-search-500.png" />
				</SearchSomeBtn>

				<InputSearch
					type="text"
					placeholder="?מה תרצו למצוא"
					value={searchBox}
					onInput={(e) => setSearchBox(e.target.value)}
				/>
			</ContainerRight>
		</Nav>
	);
};

const Nav = styled.nav`
	 {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-content: center;
		background-color: rgba(255, 255, 255, 0.5);
		position: fixed;
		width: 100%;
		z-index: 6;
		height: 6em;
	}
`;

const ContainerLeft = styled.div`
	 {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 5px;
		color: #27407f;
		width: 32em;
		margin-left: 35px;
		font-weight: 500;
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

const ContainerRight = styled.div`
	 {
		display: flex;
		align-items: center;
		width: 42%;
		justify-content: space-between;
		margin-right: 35px;
	}
`;

const SearchSomeBtn = styled.button`
	 {
		background-color: #ffffff00;
		border: none;
		height: 4em;
		position: absolute;
		margin-left: 10px;
	}
`;

const SearchSome = styled.img`
	 {
		height: 3em;
	}
`;

const InputSearch = styled.input`
	 {
		height: 4em;
		display: flex;
		align-self: center;
		border: none;
		border-bottom: 2px solid #27407f;
		width: 100%;
		text-align: right;
		font-size: 16px;
		font-weight: bold;
		outline: none;
		color: #27407f;
		background: none;

		&::placeholder {
			color: #27407f;
			font-size: 1.5em;
		}
	}
`;
export default AdminNavbar;
