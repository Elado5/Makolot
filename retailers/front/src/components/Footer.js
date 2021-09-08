import React from 'react'

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-links">
                <div className="footer-blocks">
                    <div className="links-element">
                        <h5>יצירת קשר</h5>
                        <p>055-6663999</p>

                        <ul className="list-inline">
                            <li>
                                <a href="/"><i className="fa fa-facebook"></i></a>
                            </li>
                            <li>
                                <a href="/"><i className="fa fa-instagram"></i></a>
                            </li>
                            <li>
                                <a href="/"><i className="fa fa-twitter"></i></a>
                            </li>
                        </ul>
                    </div>

                    <div className="links-element">
                        <h5>על העמותה</h5>
                        <a href="/">עלינו</a>
                        <a href="/">המרכולים שאיתנו</a>
                        <a href="/">העמותה למען הקהילה</a>
                    </div>

                    <div className="links-element">
                        <h5>מזון ומכולת</h5>
                        <a href="/">אזור אישי</a>
                        <a href="/">הזמנות קודמות</a>
                    </div>

                    <div className="links-element">
                        <h5>עזרה</h5>
                        <a href="/">שירות לקוחות</a>
                        <a href="/">שאלות נפוצות</a>
                        <a href="/">מדיניות פרטיות</a>
                        <a href="/">תקנות ותנאי שימוש</a>
                        <a href="/">מוצרים בפיקוח</a>
                    </div>

                    <div className="form-subscribe">
                        <div className="">
                            <div>
                                <h2>דמרו איתנו</h2>
                                <p>Sign up for our Newsletter and receive updates on events, collections and exclusive promotions.</p>
                            </div>
                        </div>
                        <div className="footer-copyright">
                            <div className="text-center text-uppercase">
                                <p>© 2021 כל הזכויות שמורות </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-img">
                    <img alt="footer-background" src="/images/imgbin_cherry-tomato-vegetable-fruit-orange-png.png" />
                </div>
            </div>
        </div>
    )
}
export default Footer;