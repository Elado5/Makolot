import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { productsAPI } from '../../api/api';
import { PUT, GET } from '../../api/fetch';


const AdminProductScreen = (props) => {
	const [state, setState] = useState([])

	const handleChange = (event) => {
		const { id, value } = event.target
		setState(prevState => ({
			...prevState,
			[id]: value
		}))

        console.log(`state`, state)
	}


	const UpdateProduct = async () => {
		console.log("product update state to send: ", state);

		let res = await PUT(productsAPI.put_update, [props.match.params.id], [state]);
		console.log("product update res: ", res); //see if it worked

        if(res && res.product_id){
            alert('updated succesfuly!');
            window.location = `/adminPage/product${props.match.params.id}`;
        }
        else{
            alert('update was rejected!');
        }
	}

        useEffect(() => {
            const getProductDetails = async () => {
                let res = await GET(productsAPI.get_by_id, [props.match.params.id]);
                if(res && res.product_id){
                setState(res[0]);
                }
                console.log(`state`, state)
            }

            getProductDetails();
        }, [props.match.params.id])


	return (
		<ContainerPopup>
			<PopupReg>
				<Link className="close-button" to="/adminPage">
					X
				</Link>
				<PopupRegArea>
					<PopupRegAreaSpan>עדכון מוצר</PopupRegAreaSpan>
					<PopupRegInputs>
						<RegUserName>
							<UserData>
							<UserData>
								<PopupRegAreaInput
									id="product_description"
									onChange={handleChange}
									value={state.product_description}
									type="text"
									placeholder="הסבר מוצר"
								/>
								<InputMustSpan>*</InputMustSpan>
							</UserData>
								<PopupRegAreaInput
									id="product_name"
									onChange={handleChange}
									value={state.product_name}
									type="text"
									placeholder="שם מוצר"
								/>
								<InputMustSpan>*</InputMustSpan>
							</UserData>

						</RegUserName>

						<InputsReg>
							<RegUserName>
								<UserData>
									<PopupRegAreaInput
										id="product_final_price"
										onChange={handleChange}
										value={state.product_final_price}
										type="text"
										placeholder="מחיר סופי"
									/>
									<InputMustSpan>*</InputMustSpan>
								</UserData>
								<UserData>
									<PopupRegAreaInput
										id="product_price"
										onChange={handleChange}
										value={state.product_price}
										type="number"
										placeholder="מחיר לפני הנחה"
									/>
									<InputMustSpan>*</InputMustSpan>
								</UserData>
							</RegUserName>
							<UserData>
									<PopupRegAreaInput
										id="product_description"
										onChange={handleChange}
										value={state.product_description}
										type="text"
										placeholder="הסבר על המוצר"
									/>
									<InputMustSpan>*</InputMustSpan>
								</UserData>
							<UserData>
								<PopupRegAreaInput
									id="product_suppliers"
									onChange={handleChange}
									value={state.product_suppliers}
									type="text"
									placeholder="ספקים"
								/>
								<InputMustSpan>*</InputMustSpan>
							</UserData>

							<UserData>
								<PopupRegAreaInput
									id="product_image"
									onChange={handleChange}
									value={state.product_image}
									type="text"
									placeholder="תמונת מוצר"
								/>
								<InputMustSpan>*</InputMustSpan>
							</UserData>
						</InputsReg>

						<BtnDefault onClick={UpdateProduct} type="submit"> עדכן פרטי מוצר</BtnDefault>
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

export default AdminProductScreen;
