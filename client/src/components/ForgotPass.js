import React from 'react'
import { Link } from 'react-router-dom';

const submitHandler = (event) => {
    event.preventDefault();
}

const setEmail = () => {

}
const setPassword = () => {

}

const ForgotPass = () => {
    return (
        <div className="container-popup popup-log">
            <form onSubmit={submitHandler}>
                <div className="container-popup">
                    <div className="popup-reg">
                        <Link className="close-button" to="/">X</Link>
                        <div className="popup-reg-area">
                            <h2 >forgot pass area</h2>
                            <div className="popup-reg-inputs">
                                <div className="inputs-reg">
                                    <div className="input-must">
                                        <input onChange={event => setEmail(event.target.value)}
                                            className="" type="text" id="email" placeholder="דואר אלקטרוני" />
                                        <span>*</span>
                                    </div>

                                    <div className="input-must">
                                        <input onChange={event => setPassword(event.target.value)}
                                            className="" type="text" id="password" placeholder="סיסמה" />
                                        <span>*</span>
                                    </div>
                                </div>


                                <Link to={"/forgot"}> ?שכחת את הסיסמה </Link>
                                <Link to={"/register"}> ?משתמש חדש </Link>

                                <button type="submit" className="btn-default">
                                    התחבר
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default ForgotPass;