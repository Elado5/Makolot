import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PopUpRegister = () => {
	const [ firstName, setFirstName ] = useState("");
	const [ lastName, setLastName ] = useState("");
	const [ email, setEmail ] = useState("");
	const [ pass, setPassword ] = useState("");
	const [ passConfirm, setPassConfirm ] = useState("");
	const [ passID, setPassID ] = useState("");
	const [ checkboxFirst, setCheckboxFirst ] = useState("");
	const [ checkboxSec, setCheckboxSec ] = useState("");

	const submitFunc = (event) => {
		event.preventDefault();
		console.log("reg user: " + firstName, lastName, email, pass, passConfirm, passID, checkboxFirst, checkboxSec);
	};

	//לא מיושם עדיין
	const is_israeli_id_number = (id) => {
		id = String(id).trim();
		if (id.length > 9 || isNaN(id)) return false;
		id = id.length < 9 ? ("00000000" + id).slice(-9) : id;
		return (
			Array.from(id, Number).reduce((counter, digit, i) => {
				const step = digit * (i % 2 + 1);
				return counter + (step > 9 ? step - 9 : step);
			}) %
				10 ===
			0
		);
	};

	return (
		<form onSubmit={submitFunc}>
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
										onChange={(event) => setFirstName(event.target.value)}
										type="text"
										placeholder="שם פרטי"
									/>
									<InputMustSpan>*</InputMustSpan>
								</UserData>
								<UserData>
									<PopupRegAreaInput
										onChange={(event) => setLastName(event.target.value)}
										type="text"
										placeholder="שם משפחה "
									/>
									<InputMustSpan>*</InputMustSpan>
								</UserData>
							</RegUserName>

							<InputsReg>
								<UserData>
									<PopupRegAreaInput
										onChange={(event) => setEmail(event.target.value)}
										type="text"
										placeholder="דואר אלקטרוני"
										pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
									/>
									<InputMustSpan>*</InputMustSpan>
								</UserData>
								<UserData>
									<PopupRegAreaInput
										onChange={(event) => setPassword(event.target.value)}
										type="password"
										placeholder="סיסמה"
										pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
									/>
									<InputMustSpan>*</InputMustSpan>
								</UserData>
								<UserData>
									<PopupRegAreaInput
										onChange={(event) => setPassConfirm(event.target.value)}
										type="password"
										placeholder="אימות סיסמה"
										pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
									/>
									<InputMustSpan>*</InputMustSpan>
								</UserData>
								<UserData>
									<PopupRegAreaInput
										onChange={(event) => setPassID(event.target.value)}
										type="text"
										placeholder="תעודת זהות"
										required={(e) => is_israeli_id_number(e.target.value)}
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
										onChange={(event) => setCheckboxFirst(event.target.value)}
										type="checkbox"
									/>
								</CheckboxInput>
								<CheckboxInput>
									<h6>
										Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying
										out print, graphic or web designs
									</h6>
									<Checkbox
										onChange={(event) => setCheckboxSec(event.target.value)}
										type="checkbox"
									/>
								</CheckboxInput>
							</div>

							<BtnDefault type="submit"> הרשמה</BtnDefault>
						</PopupRegInputs>
					</PopupRegArea>
				</PopupReg>
			</ContainerPopup>
		</form>
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
