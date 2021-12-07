import React, { useState, useEffect } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import styled from "styled-components";
import { productsAPI } from '../../api/api';
import { PUT, POST, GET, POST_IMAGE } from '../../api/fetch';


const AdminProductImageScreen = (props) => {

	let location = useLocation();
	let id = location?.state?.id;

	const [state, setState] = useState({})
	const [product, setProduct] = useState([]);


	const GetProductByID = async () => {
		let res = await GET(productsAPI.get_by_id, [id]) //*get product by id
		setProduct(res[0]);
		console.log(`res`, res)
	}

	useEffect(() => {
		GetProductByID();
	}, [state])

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
		else {
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
					<ProductItemImage src={product?.product_image} alt={product?.product_name} />
					<PopupRegInputs>

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
		font-size: 2.5rem;
		font-weight: 500;
		text-decoration: underline;
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


const ProductItemImage = styled.img`{
	margin-top: 2rem;
    height: 15rem;
	border-radius: 2rem;
}`

export default AdminProductImageScreen;
