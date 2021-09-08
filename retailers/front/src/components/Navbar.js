import React, { useState } from 'react'
import Basket from './Basket';
import ShoppingCart from '../components/ShoppingCart';
import MenuSideBar from './MenuSideBar';

const Navbar = (props) => {
    const { counterProduct, addItem, removeItem, cartItems } = props;

    const [open, setOpen] = useState(false);

    return (
        <div className="navbar">

            <div className="container-left">
                {props.children}

                <a href="/" className="logo">
                    <img className="nav-img" alt="logo" src="/images/logo.png" />
                </a>

                <button className="btn-basket" onClick={() => setOpen(!open)}>
                    <Basket counterProduct={counterProduct} />
                </button>


                {open &&

                    <div className="dropdownShoppingCart">
                        <ShoppingCart addItem={addItem} removeItem={removeItem} cartItems={cartItems} open={open} setOpen={setOpen} />
                    </div>
                }


                <hr className="hr-nav"/>
                <span className="">אודות העמותה</span>
                <hr className="hr-nav"/>
                <span className="">055-6663999</span>

            </div>

            <div className="container-right">

                <button className="search-some-btn">
                    <img className="search-some" alt="search" src="/images/icons8-search-500.png" />
                </button>
                <input className="input-search" type="text" placeholder="?מה תרצה למצוא" />

                <div>
                
                    <MenuSideBar></MenuSideBar>
 
                </div>
            </div>
        </div>
    )
}
export default Navbar;