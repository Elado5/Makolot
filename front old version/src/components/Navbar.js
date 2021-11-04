import React from 'react'

export default function Navbar() {
    return (
        <div class="navbar">
            <div class="container-left">
                <a href="/" class="logo">
                    <img class="nav-img" src="/images/logo.png" />
                </a>

                <div class="basket">
                    <img class="basket-icon" src="/images/icons8-shopping-cart-96.png"></img>
                    <span id="counter-basket">
                        <span>{18}</span>
                    </span>
                </div>

                <hr />
                <span class="">אודות העמותה</span>
                <hr />
                <span class="">055-6663999</span>

            </div>

            <div class="container-right">
                {/* <a href="/" class="">card</a>
                <a href="/" class="">sing in</a> */}

                <button class="search-some-btn"> <img class="search-some" src="/images/icons8-search-500.png" /></button>
                <input class="input-search" type="text" placeholder="?מה תרצה למצוא" />

                <div>
                    <button class="burger-icon-btn"> <img class="burger-icon-img" src="/images/icons8-menu-256.png" /></button>
                </div>
            </div>
        </div>
    )
}
