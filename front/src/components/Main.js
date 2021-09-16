import React, {useEffect} from 'react'
import {customers} from '../api/api';
import {GET} from '../api/fetch';

export default function Main() {

    const LoadSpecificUser = async (id) => {
        let c1 = await GET(customers.get_by_id,[id]);
        console.info(c1);
    }

    const LoadCustomers = async () => {
        let c = await GET(customers.get_all);
        console.table(c);
    }
    useEffect(() => {
        LoadSpecificUser(1);
        LoadSpecificUser(2);
        LoadCustomers();
    }, [])


    return (
        <div class="main-container">
            <div class="video-container">
                <video autoPlay muted loop class="video-parallax">
                    <source src="/images/video.mp4" type="video/mp4" />
                </video>
            </div>

            <div class="right-data">
                <div class="right-data-main">
                    <div class="main-elements">
                        <div class="circular">
                            <div class="inner"></div>
                            <div class="number"> 60 דק׳ <span class="span-text"> והזמנה אצלך</span> </div>

                            <div class="circle-background">
                                <div class="circle">
                                    <div class="bar left">
                                        <div class="progress"></div>
                                    </div>
                                    <div class="bar right">
                                        <div class="progress"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="text-area-main">
                            <h1>!ההזמנה עוד רגע אצלך</h1>
                            <p>
                                נעים להכיר, אנחנו עמותה חברית כלכלית שבאה להציע <br /> שינוי בעולם הקמעונות בישראל
                            </p>
                            <h4>בחר/י את המרכולת שלך</h4>
                        </div>

                    </div>
                </div>

                <div class="input-location-area">
                    <input class="input-search-location-main" type="text" placeholder="העיר שלך: ראשון לציון, יבנה, חולון, חיפה ">

                    </input>
                    <button class="search-some-btn"> <img class="search-some" src="/images/icons8-search-500.png" /></button>
                </div>
            </div>
        </div>
    )
}