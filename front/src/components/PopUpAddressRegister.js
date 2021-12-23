import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { addressesAPI, customersAPI } from '../api/api';
import { POST, PUT, DELETE } from '../api/fetch';
import { BeatLoader } from 'react-spinners';


const PopUpAddressRegister = () => {

	const loggedUser = JSON.parse(sessionStorage.getItem('currentLoggedIn')) || false;


	const [state, setState] = useState({
		"city": "",
		"street": "",
		"other_data": "",
		"zip_code": ""
	})

	const [loading, setLoading] = useState(false);

	const handleChange = (event) => {
		const { id, value } = event.target
		setState(prevState => ({
			...prevState,
			[id]: value
		}))
	}


	const RegisterAddress = async () => {

		console.log("customer reg state: ", state)
		let address = {
			city: state.city,
			street: state.street,
			other_data: state.other_data,
			zip_code: state.zip_code
		}
		let res = await POST(addressesAPI.post_add, address);
		console.log("address added: ", res); //see if it worked

		const payload = {
			"city": state.city,
			"street": state.street,
			"other_data": state.other_data,
			"zip_code": state.zip_code
		}
		console.log("payload" + payload)
		return res;
	}

	const submitFunc = async (event) => {
		event.preventDefault();
		if (/[a-zA-Z\u0590-\u05fe]/g.test(state.city) === false
			|| /[a-zA-Z\u0590-\u05fe]/g.test(state.street) === false) {
			alert('.כל השדות מלבד "פרטים נוספים" הינם שדות חובה, אנא הקלידו פרטים נכונים ונסו שנית');
		}

		//TODO make address add return the address id and then save it in the user's address_id

		else {
			setLoading(true);
			let res = await RegisterAddress();
			//* if it worked it needs to return the customer's id in 'res', if not then there was an error.
			try {
				if (res?.address_id) {
					let customerRes = await PUT(customersAPI.put_update_address, [res.address_id], [loggedUser.customer_id]);
					if (!customerRes?.address_id) {
						alert("עדכון הכתובת נדחה, אנא נסו שנית")
					}
					setLoading(false);
				}
				else {
					setLoading(false);
					alert('הרשמת הכתובת נדחתה, אנא בדקו את הפרטים שהזנתם ונסו שוב');
				}
			}
			catch (err) {
				console.error(err);
			}
		}
	};


	return (
		<ContainerPopup>
			<PopupReg>
				<Link className="close-button" to="/">
					X
				</Link>
				<PopupRegArea>
					<PopupRegAreaSpan>הוספת כתובת</PopupRegAreaSpan>
					<PopupRegInputs>
						<RegUserName>
							<UserData>
								<PopupRegAreaInput
									id="city"
									onChange={handleChange}
									value={state.city}
									type="text"
									placeholder="עיר"
								/>
								<InputMustSpan>*</InputMustSpan>
							</UserData>

						</RegUserName>

						<InputsReg>
							<RegUserName>
								<UserData>
									<PopupRegAreaInput
										id="street"
										onChange={handleChange}
										value={state.street}
										type="text"
										placeholder="רחוב"
									/>
									<InputMustSpan>*</InputMustSpan>
								</UserData>
								<UserData>
									<PopupRegAreaInput
										id="other_data"
										onChange={handleChange}
										value={state.other_data}
										type="text"
										placeholder="פרטים נוספים"
									/>
									<InputMustSpan>*</InputMustSpan>
								</UserData>
							</RegUserName>
							
							<UserData>
								<PopupRegAreaInput
									id="zip_code"
									onChange={handleChange}
									value={state.zip_code}
									type="number"
									placeholder="מיקוד"
									min="1000000" max="9999999"
								/>
								<InputMustSpan>*</InputMustSpan>
							</UserData>

							{loading &&
								<Loader>
									<BeatLoader color='navy' loading />
								</Loader>
							}
						</InputsReg>

						<BtnDefault onClick={submitFunc} type="submit"> הוספת כתובת</BtnDefault>
					</PopupRegInputs>
				</PopupRegArea>
			</PopupReg>
		</ContainerPopup>
	);
};

const ContainerPopup = styled.div`
	 {
		position: fixed;
		z-index: 5;
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
		font-weight: 500;
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

const Loader = styled.div`{
    display: flex;
    justify-content: center;
    width: 100%;
    z-index: 2;
}`;


export default PopUpAddressRegister;
