import React from 'react'
import { Link } from 'react-router-dom';

const PopUpRegister = () => {
    return (
        <div className="container-popup">
            <div className="popup-reg">
                <Link className="close-button" to="/">X</Link>
                <div className="popup-reg-area">
                    <h2>הרשמה לאתר</h2>
                    <div className="popup-reg-inputs">
                        <div>
                            <input className="" type="text" placeholder="שם פרטי" />
                            <input className="" type="text" placeholder="שם משפחה " />
                        </div>
                        <div className="inputs-reg">
                            <input className="" type="text" placeholder="דואר אלקטרוני" />
                            <input className="" type="text" placeholder="סיסמה" />
                            <input className="" type="text" placeholder="אימות סיסמה " />
                            <input className="" type="text" placeholder="תעודת זהות" />
                        </div>
                        <input type=""></input>
                        <input type=""></input>

                        <button className="btn-default">
                            הרשמה
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PopUpRegister;