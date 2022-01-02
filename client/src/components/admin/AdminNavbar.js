import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AdminNavbarData } from './AdminNavbarData';


const AdminNavbar = () => {

	
	return (
		<Nav>
			<Container>
				{AdminNavbarData.map((item, key) =>
					<>
						<Link to={item.path} key={key}>{item.title}</Link>
						<HrNav />

						{key === AdminNavbarData.length / 2 - 1 &&
							<>
								<Link to="/adminPage">
									<NavImg
										alt="logo"
										src="/images/logo.png"
									/>
								</Link>
								<HrNav />
							</>
						}
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
		background-image: linear-gradient(rgba(45, 85, 155, 0.9),#cad4fa, rgba(65, 85, 195, 0.5));
		background-color: white;
		position: fixed;
		width: 100%;
		z-index: 6;
		height: 6.5rem;
		box-shadow: 0px 1px 8px black;
		
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
		text-shadow: 0px 1px 4px rgba(255, 255, 255, 1);
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
		border: 1px solid #37668839;
		width: 0px;
		margin: 17px;
	}
`;
export default AdminNavbar;
