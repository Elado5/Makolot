import React from 'react'
import { Link } from 'react-router-dom';

const PopUpLogin = () => {
    return (
        <div className="container-popup popup-log">
            <div className="container-popup">
                <div className="popup-reg">
                    <Link className="close-button" to="/">X</Link>
                    <div className="popup-reg-area">
                        <h2 >התחברות</h2>
                        <div className="popup-reg-inputs">
                            <div className="inputs-reg">
                                <input className="" type="text" placeholder="דואר אלקטרוני" />
                                <input className="" type="text" placeholder="סיסמה" />
                            </div>

                            <div>?שכחת את הסיסמה</div>

                            <button className="btn-default">
                                התחבר
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PopUpLogin;