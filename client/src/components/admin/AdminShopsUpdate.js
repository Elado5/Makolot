import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { shopsAPI } from '../../api/api';
import { PUT, GET } from '../../api/fetch';
import { BeatLoader } from 'react-spinners';

const AdminShopsUpdate = (props) => {

	const [load, setLoad] = useState(false);

	const [state, setState] = useState({
        "grocery_shop_id": "",
		"grocery_shop_name": "",
		"grocery_shop_city": "",
		"grocery_shop_radius": "",
		"grocery_shop_opening_times": "",
		"grocery_shop_phone_number": "",
		"grocery_shop_contact_name": "",
		"retailer_id": "",
		"address_id": ""
	})

	const handleChange = (event) => {
		const { id, value } = event.target
		setState(prevState => ({
			...prevState,
			[id]: value
		}))

		console.log(`state`, state)
	}


	const UpdateShop = async () => {
		setLoad(true);
		let res = await PUT(shopsAPI.put_update, [state.grocery_shop_id], state);
		if (res) {
			alert('updated succesfuly!');
		}
		else {
			alert('update was rejected!');
		}
		setLoad(false);
	}


	useEffect(() => {
		const getShopDetails = async () => {
			setLoad(true);
			let res = await GET(shopsAPI.get_by_id, [props.match.params.id]);
			if (res[0]?.grocery_shop_id)
			setState(res[0]);
			else{
				window.location = '/adminPage'
			}
			console.log(`state`, state)
			setLoad(false);
		}

		getShopDetails();
	}, [props.match.params.id])


	return (
		<ContainerPopup>
			<PopupReg>
				<Link className="close-button" to="/adminPage">
					X
				</Link>
				<PopupRegArea>
					<PopupRegAreaSpan>עדכון חנות</PopupRegAreaSpan>
					{load &&
						<Loader>
							<BeatLoader color='teal' loading />
						</Loader>
					}
					<PopupRegInputs>
						<RegUserName>
							<UserData>
								<UserData>
									<PopupRegAreaInput
										id="grocery_shop_name"
										onChange={handleChange}
										value={state.grocery_shop_name}
										type="text"
										placeholder="שם החנות"
									/>
									<InputMustSpan>*</InputMustSpan>
								</UserData>
								<PopupRegAreaInput
									id="grocery_shop_opening_times"
									onChange={handleChange}
									value={state.grocery_shop_opening_times}
									type="text"
									placeholder="זמני פתיחה"
								/>
								<InputMustSpan>*</InputMustSpan>
							</UserData>

						</RegUserName>

						<InputsReg>
							<RegUserName>
								<UserData>
									<PopupRegAreaInput
										id="grocery_shop_phone_number"
										onChange={handleChange}
										value={state.grocery_shop_phone_number}
										type="text"
										placeholder="מספר טלפון"
									/>
									<InputMustSpan>*</InputMustSpan>
								</UserData>
								<UserData>
									<PopupRegAreaInput
										id="grocery_shop_contact_name"
										onChange={handleChange}
										value={state.grocery_shop_contact_name}
										type="text"
										placeholder="שם איש קשר"
									/>
									<InputMustSpan>*</InputMustSpan>
								</UserData>
							</RegUserName>
							<UserData>
								<PopupRegAreaInput
									id="grocery_shop_city"
									onChange={handleChange}
									value={state.grocery_shop_city}
									type="text"
									placeholder="כתובת"
								/>
								<InputMustSpan>*</InputMustSpan>
							</UserData>
						</InputsReg>

						<BtnDefault onClick={UpdateShop} type="submit"> עדכן פרטי חנות</BtnDefault>
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
    height: 1rem;
    width: 100%;
    z-index: 2;
    margin-bottom: 2px;
}`;

export default AdminShopsUpdate;
