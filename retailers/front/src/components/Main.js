import React from 'react'


const Main = () => {
    return (
        <div className="main-container">
            <div className="video-container">
                <video autoPlay muted loop className="video-parallax">
                    <source src="/images/video.mp4" type="video/mp4" />
                </video>
            </div>

            <div className="right-data">
                <div className="right-data-main">
                    <div className="main-elements">
                        <div className="circular">
                            <div className="inner"></div>
                            <div className="number"> 60 דק׳ <span className="span-text"> והזמנה אצלך</span> </div>

                            <div className="circle-background">
                                <div className="circle">
                                    <div className="bar left">
                                        <div className="progress"></div>
                                    </div>
                                    <div className="bar right">
                                        <div className="progress"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-area-main">
                            <h1>!ההזמנה עוד רגע אצלך</h1>
                            <p>
                                נעים להכיר, אנחנו עמותה חברית כלכלית שבאה להציע <br /> שינוי בעולם הקמעונות בישראל
                            </p>
                            <h4>בחר/י את המרכולת שלך</h4>
                        </div>

                    </div>
                </div>

                <div className="input-location-area">
                    <input className="input-search-location-main" type="text" placeholder="העיר שלך: ראשון לציון, יבנה, חולון, חיפה ">

                    </input>
                    <button className="search-some-btn"> <img alt="search-location" className="search-some" src="/images/icons8-search-500.png" /></button>
                </div>
            </div>
        </div>
    )
}
export default Main;