import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Footer = () => {
    return (
        <FooterBox>
            <FooterLinks>
                <FooterBlocks>
                    <LinksElement>
                        <h4>יצירת קשר</h4>
                        <p>055-6663999</p>

                        <ListInline>
                            <Link to="/"><i className="fa fa-facebook"></i></Link>
                            <Link to="/"><i className="fa fa-instagram"></i></Link>
                            <Link to="/"><i className="fa fa-twitter"></i></Link>
                        </ListInline>
                    </LinksElement>

                    <LinksElement>
                        <h4>על העמותה</h4>
                        <Link to="/">עלינו</Link>
                        <Link to="/">המרכולים שאיתנו</Link>
                        <Link to="/">העמותה למען הקהילה</Link>
                    </LinksElement>

                    <LinksElement>
                        <h4>מזון ומכולת</h4>
                        <Link to="/">אזור אישי</Link>
                        <Link to="/">הזמנות קודמות</Link>
                    </LinksElement>

                    <LinksElement>
                        <h4>עזרה</h4>
                        <Link to="/">שירות לקוחות</Link>
                        <Link to="/">שאלות נפוצות</Link>
                        <Link to="/">מדיניות פרטיות</Link>
                        <Link to="/">תקנות ותנאי שימוש</Link>
                        <Link to="/">מוצרים בפיקוח</Link>
                    </LinksElement>

                    <FormSubscribe>
                        <div>
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
                    </FormSubscribe>
                </FooterBlocks>

                <FooterImg>
                    <img alt="footer-background" src="/images/imgbin_cherry-tomato-vegetable-fruit-orange-png.png" />
                </FooterImg>
            </FooterLinks>
        </FooterBox>
    )
}


const FooterBox = styled.footer`{
    background-color: #fafafa;
  }`

const FooterLinks = styled.div`{
    display: flex;
    flex-direction: column;
    position: absolute;
    text-align: right;
    color: #27407f;
    height: 32em;
    width: 100%;
    background-color: #fafafa;
  }`

const FooterBlocks = styled.div`{
    display: flex;
    justify-content: space-between;
    position: relative;
    height: 30em;
  }`

const LinksElement = styled.div`{
    display: flex;
    flex-direction: column;
    margin: 2%;
    width: 11em;
  }`

const ListInline = styled.ul`{
    margin-left: 3em;
    display: flex;
    justify-content: space-between;
    list-style: none;
    color: #27407f;
  }`

const FormSubscribe = styled.div`{
    background-color: #eaebf1;
    border-radius: 26% 50% 0% 42%;
    height: 108%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }`


const FooterImg = styled.div`{
    position: absolute;
    margin-top: 13em;
    margin-left: 15em;
  }`

export default Footer;