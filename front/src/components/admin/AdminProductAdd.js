import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { productsAPI } from '../../api/api';
import { POST, POST_IMAGE, PUT, GET } from '../../api/fetch';


const AdminProductAdd = (props) => {
	const [state, setState] = useState({
		"product_name": "",
		"category_id": "",
		"sub_category_id": "",
		"product_price": "",
		"product_final_price": "",
		"product_description": "",
		"product_details": "",
		"product_suppliers": "",
		"product_image": ""
	})
	const [image, setImage] = useState({});

	const handleChange = (event) => {
		const { id, value } = event.target
		setState(prevState => ({
			...prevState,
			[id]: value
		}))
		console.log(`state`, state)
	}

	
	const handleChangeImage = (file) => {
			setImage(file);
	}

	const UpdateProduct = async () => {
		console.log("product update state to send: ", state);
		console.log(JSON.stringify(state))
		let res = await POST(productsAPI.post_add, state);
		console.log("product add res: ", res.product_id); //see if it worked

		if (res) {
			console.log(`state.product_image`, state.product_image);
			alert('uploaded succesfully');
			let uploadResult = await POST_IMAGE(productsAPI.post_single_upload, image);

			if (uploadResult) {
				let updateResult = await PUT(productsAPI.put_update_image, [res.product_id], { "product_image": uploadResult.path });
				if (updateResult)
					alert("Image updated succesfully.");
				else
					alert("Image updated failed.")
			}
			else {
				alert("Upload failed!");
			}
		}
		else {
			alert('update was rejected!');
		}
	}


	return (
		<ContainerPopup>
			<PopupReg>
				<Link className="close-button" to="/adminPage">
					X
				</Link>
				<PopupRegArea>
					<PopupRegAreaSpan>הוספת מוצר</PopupRegAreaSpan>
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
										type="number"
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
									id="product_details"
									onChange={handleChange}
									value={state.product_details}
									type="text"
									placeholder="פרטי המוצר"
								/>
								<InputMustSpan>*</InputMustSpan>
							</UserData>
							
							<UserData>
								<PopupRegAreaInput
									id="category_id"
									onChange={handleChange}
									value={state.category_id}
									type="number"
									placeholder="מספר קטגוריה"
								/>
								<InputMustSpan>*</InputMustSpan>
								<PopupRegAreaInput
									id="sub_category_id"
									onChange={handleChange}
									value={state.sub_category_id}
									type="number"
									placeholder="מספר תת קטגוריה"
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
									onChange={(e) => { handleChangeImage(e.target.files[0])  }}
									type="file"
									name="myImage"
									placeholder="תמונת מוצר"
									accept="image/png, image/webp, image/jpeg"
								/>

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

export default AdminProductAdd;
