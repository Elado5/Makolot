import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { customersAPI } from '../api/api';
import { POST, PUT, DELETE } from '../api/fetch';


const PopUpRegister = () => {
	const [state, setState] = useState({
		customer_first_name: "",
		customer_last_name: "",
		customer_email: "",
		customer_phone_number: "",
		customer_birthdate: "2000-01-01",
		customer_password: "",
		passConfirm: "",
		customer_city: "",
		address_id: "",
		credit_card_id: "", // what about credit card date & cvv?
		checkboxFirst: "",
		checkboxSec: ""
	})

	const handleChange = (event) => {
		const { id, value } = event.target
		setState(prevState => ({
			...prevState,
			[id]: value
		}))
	}

	const submitFunc = (event) => {
		event.preventDefault();
		if(/^([\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,})$/.test(state.customer_first_name && state.customer_last_name) === false) {
			alert('Names must be 2 characters long or more and with no numbers or special characters, please try again.')
		}
		else if (!(state.customer_password === state.passConfirm)) {
			alert('The passwords must be identical, please try again.')
		}
		else if (/([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4})$/.test(state.customer_email) === false) {
			alert('Please enter a valid email address and try again.')
		}
		else if (/^(05\d([-]{0,1})\d{7})$/.test(state.customer_phone_number) === false) {
			alert('Please enter a valid phone number and try again.')
		}
		else if (/^((?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,})$/.test(state.customer_password) === false) {
			alert('The password must contain one capital letter, 1 number and have a least 8 characters.')
		}
		else {
			RegisterCustomer();
		}
	};


	const RegisterCustomer = async () => {

		console.log("customer reg state: ", state)
		let customer = {
			customer_first_name: state.customer_first_name,
			customer_last_name: state.customer_last_name,
			customer_email: state.customer_email,
			customer_phone_number: state.customer_phone_number,
			customer_password: state.customer_password,
			customer_birthdate: state.customer_birthdate
		}
		let res = await POST(customersAPI.post_register, customer);
		console.log("user added: ", res); //see if it worked

		if (state.customer_email.length && state.customer_password.length) {
			const payload = {
				"customer_first_name": state.customer_first_name,
				"customer_last_name": state.customer_last_name,
				"customer_email": state.customer_email,
				"customer_phone_number": state.customer_phone_number,
				"customer_birthdate": state.customer_birthdate,
				"customer_password": state.customer_password,
				"customer_city": state.customer_city,
				"address_id": state.address_id,
				"credit_card_id": state.credit_card_id, // what about credit card date & cvv?
			}
			console.log("payload" + payload)

		} else {
			alert('Please check your data and try again!')
		}
	}

	return (
		<ContainerPopup>
			<PopupReg>
				<Link className="close-button" to="/">
					X
				</Link>
				<PopupRegArea>
					<PopupRegAreaSpan>הרשמה לאתר</PopupRegAreaSpan>
					<PopupRegInputs>
						<RegUserName>
							<UserData>
								<PopupRegAreaInput
									id="customer_first_name"
									onChange={handleChange}
									value={state.customer_first_name}
									type="text"
									placeholder="שם פרטי"
								/>
								<InputMustSpan>*</InputMustSpan>
							</UserData>
							<UserData>
								<PopupRegAreaInput
									id="customer_last_name"
									onChange={handleChange}
									value={state.customer_last_name}
									type="text"
									placeholder="שם משפחה"
								/>
								<InputMustSpan>*</InputMustSpan>
							</UserData>
						</RegUserName>

						<InputsReg>
							<RegUserName>
								<UserData>
									<PopupRegAreaInput
										id="customer_email"
										onChange={handleChange}
										value={state.customer_email}
										type="text"
										placeholder="דואר אלקטרוני"
									/>
									<InputMustSpan>*</InputMustSpan>
								</UserData>
								<UserData>
									<PopupRegAreaInput
										id="customer_phone_number"
										onChange={handleChange}
										value={state.customer_phone_number}
										type="text"
										placeholder="מספר נייד"
									/>
									<InputMustSpan>*</InputMustSpan>
								</UserData>
							</RegUserName>
							<UserData>
									<PopupRegAreaInput
										id="customer_birthday"
										onChange={handleChange}
										value={state.customer_birthdate}
										type="date"
										placeholder="תאריך לידה"
										min="1900-01-01" max="2018-12-31"
									/>
									<InputMustSpan>*</InputMustSpan>
								</UserData>
							<UserData>
								<PopupRegAreaInput
									id="customer_password"
									onChange={handleChange}
									value={state.customer_password}
									type="password"
									placeholder="סיסמה"
								/>
								<InputMustSpan>*</InputMustSpan>
							</UserData>

							<UserData>
								<PopupRegAreaInput
									id="passConfirm"
									onChange={handleChange}
									value={state.passConfirm}
									type="password"
									placeholder="אימות סיסמה"
								/>
								<InputMustSpan>*</InputMustSpan>
							</UserData>
						</InputsReg>

						<div>
							<CheckboxInput>
								<h6>
									Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying
									out print, graphic or web designs
								</h6>
								<Checkbox
									id="checkboxFirst"
									onChange={handleChange}
									value={state.checkboxFirst}
									type="checkbox"
								/>
							</CheckboxInput>
							<CheckboxInput>
								<h6>
									Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying
									out print, graphic or web designs
								</h6>
								<Checkbox
									id="checkboxSec"
									onChange={handleChange}
									value={state.checkboxSec}
									type="checkbox"
								/>
							</CheckboxInput>
						</div>

						<BtnDefault onClick={submitFunc} type="submit"> הרשמה</BtnDefault>
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
	}
`;

const PopupReg = styled.div`
	 {
		background-color: white;
		border-radius: 3em;
		width: 40%;
		height: 80%;
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
		font-size: 15px;
	}
`;

const PopupRegAreaSpan = styled.span`
	 {
		color: #27407f;
		font-size: 30px;
		font-weight: 800;
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
		height: 2.5em;
		width: 10em;
		font-family: system-ui;
		cursor: pointer;
	}
`;

const CheckboxInput = styled.div`
	 {
		display: flex;
		flex-direction: row;
		align-items: center;
		text-align: end;
		width: 100%;
		margin: 10px;
	}
`;

const Checkbox = styled.input`
	 {
		margin: 10px;
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

export default PopUpRegister;
