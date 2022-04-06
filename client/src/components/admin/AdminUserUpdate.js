import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import { customersAPI } from '../../api/api';
import { PUT, GET } from '../../api/fetch';
import { BeatLoader } from 'react-spinners';


const AdminUserUpdate = (props) => {

	const loggedUser = JSON.parse(sessionStorage.getItem('currentLoggedIn')) || false;

	const [onLoad, setOnLoad] = useState(false);
	const [load, setLoad] = useState(false); //beat loader
	const [state, setState] = useState({
		"customer_city": "",
		"customer_phone_number": ""
	})

	const handleChange = (event) => {
		const { id, value } = event.target
		setState(prevState => ({
			...prevState,
			[id]: value
		}))

		console.log(`state`, state)
	}


	const UpdateCustomer = async () => {
		setLoad(true);
		console.log("customer update state to send: ", state);
		console.log(JSON.stringify(state))
		let res = await PUT(customersAPI.put_update, [state.customer_id], state);
		console.log("customer update res: ", res); //see if it worked
		if (res) {
			let user = await GET(customersAPI.get_by_id, [res.customer_id_output]);
			alert('updated succesfuly!');

		}
		else {
			alert('update was rejected!');
		}
		setLoad(false);
	}

	useEffect(() => {
		const getCustomerDetails = async () => {
			setLoad(true);
			console.log(`props.match.params.id`, props.match.params.id)
			let res = await GET(customersAPI.get_by_id, [props.match.params.id]);
			console.log(`res`, res)
			if (res.customer_id) {
				console.log(`res.customer_id`, res.customer_id)
				setState(res);
			}
			console.log(`state`, state)
			setLoad(false);
			setOnLoad(true);
		}
		getCustomerDetails();
	}, [onLoad])

	if (!props.match.params.id) {
		return (
			<Redirect to="/userPage" />
		)
	}

	return (
		<ContainerPopup>
			<PopupReg>
				<Link className="close-button" to="/adminPage">
					X
				</Link>
				<PopupRegArea>
					<PopupRegAreaSpan>עדכון פרטים</PopupRegAreaSpan>
					<PopupRegInputs>
						<InputsReg>
							<UserData>
								<PopupRegAreaInput
									id="customer_phone_number"
									onChange={handleChange}
									value={state.customer_phone_number}
									type="text"
									placeholder="מספר פלאפון"
								/>
								<InputMustSpan>*</InputMustSpan>
							</UserData>
							<UserData>
								<PopupRegAreaInput
									id="customer_city"
									onChange={handleChange}
									value={state.customer_city}
									type="text"
									placeholder="עיר"
								/>
								<InputMustSpan>*</InputMustSpan>
							</UserData>
						</InputsReg>
						<BeatLoader color='navy' loading={load} />

						<BtnDefault onClick={UpdateCustomer} type="submit"> עדכן פרטים</BtnDefault>
					</PopupRegInputs>
				</PopupRegArea>
			</PopupReg>
		</ContainerPopup>
	);
};

const ContainerPopup = styled.div`
	 {
		position: fixed;
		z-index: 3;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.25);
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		backdrop-filter: blur(2px);
	}
`;

const PopupReg = styled.div`
	 {
		background-color: white;
		border-radius: 3em;
		width: 40%;
		height: 60%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
`;

const PopupRegArea = styled.div`
	 {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		height: 80%;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.)
	}
`;

const PopupRegAreaInput = styled.input`
	 {
		text-align: right;
		border: none;
		border-bottom: 1px solid #27407f;
		height: 3em;
		outline: none;
		width: 100%;
		color: #27407f;
		font-weight: bold;
		font-size: 1.5rem;
	}
`;

const PopupRegAreaSpan = styled.span`
	 {
		color: #27407f;
		font-size: 3rem;
		font-weight: 500;
		text-shadow: 0px 0px 3px grey;
	}
`;

const PopupRegInputs = styled.div`
	 {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		height: 100%;
		align-items: center;
		width: 80%;
	}
`;

const InputsReg = styled.div`
	 {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
`;

const InputMustSpan = styled.span`
	 {
		color: red;
		font-size: 23px;
	}
`;

const BtnDefault = styled.button`
	 {
		background-color: #27407f;
		color: aliceblue;
		border: none;
		border-radius: 25px;
		height: 3em;
		width: 10em;
		font-family: system-ui;
		cursor: pointer;
	}
`;

const UserData = styled.div`
	 {
		display: flex;
		align-items: center;
		width: 100%;
		margin: 1em;
	}
`;

const RegUserName = styled.div`
	 {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 100%;

		${UserData} {
			margin: 1em;
		}
	}
`;

export default AdminUserUpdate;
