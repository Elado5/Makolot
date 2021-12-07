import React, { useState, useEffect } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import styled from "styled-components";
import { productsAPI } from '../../api/api';
import { PUT, POST, GET, POST_IMAGE } from '../../api/fetch';


const AdminProductImageScreen = (props) => {

	let location = useLocation();
	let id = location?.state?.id;

	const [state, setState] = useState({})

	if (!id) {
		return (
			<Redirect to={`/adminPage`} />
		)
	}

	const handleChange = (value) => {
		setState(value)
	}


	const UpdateProduct = async () => {

		if (state?.name) {
			let uploadResult = await POST_IMAGE(productsAPI.post_single_upload, state);

			if (uploadResult) {
				let updateResult = await PUT(productsAPI.put_update_image, [id], { "product_image": uploadResult.path });
				if (updateResult)
					alert("Image updated succesfully.");
				else
					alert("Image updated failed.")
			}
			else
				alert("Upload failed!");
		}
		else{
			console.log(`state`, state)
		}
	}


	return (
		<ContainerPopup>
			<PopupReg>
				<Link className="close-button" to="/adminPage">
					X
				</Link>
				<PopupRegArea>
					<PopupRegAreaSpan>עדכון תמונת מוצר</PopupRegAreaSpan>
					<PopupRegInputs>

						<InputMustSpan>*</InputMustSpan>
						<PopupRegAreaInput
							type="file"
							accept="image/png, image/webp, image/jpeg"
							onChange={(e) => { handleChange(e.target.files[0]) }}
						/>

						<BtnDefault onClick={UpdateProduct} type="submit"> עדכן תמונת מוצר</BtnDefault>
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

export default AdminProductImageScreen;
