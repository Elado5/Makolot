import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ADDRESS_DATA } from '../api/addressesAPI';

const Main = () => {

    //* States
    const [streets, SetStreets] = useState([]); //State of street suggestions array
    const [searchStreet, setSearchStreet] = useState(''); //state of search box value

    //Loads streets from Israel's API
    const LoadStreets = async () => {
        let res; 
        if(searchStreet === ''){
           res = await ADDRESS_DATA(0);
        }else   
            res =  await ADDRESS_DATA(50, searchStreet);
        SetStreets(res)
    }

    //Refresh the street suggestions every time the state of the search box is changed.
    useEffect(() => {
        LoadStreets();
    }, [searchStreet]);


    return (
        <MainContainer>
            <VideoContainer>
                <VideoBox autoPlay muted loop>
                    <source src="/images/video.mp4" type="video/mp4" />
                </VideoBox>
            </VideoContainer>

            <RightData>
                <RightDataMain>
                    <MainElements>
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

                        <TextAreaMain>
                            <h1>!ההזמנה עוד רגע אצלך</h1>
                            <h5>
                                נעים להכיר, אנחנו עמותה חברית כלכלית שבאה להציע <br /> שינוי בעולם הקמעונות בישראל
                            </h5>
                            <h4>בחר/י את המרכולת שלך</h4>
                        </TextAreaMain>

                    </MainElements>
                </RightDataMain>

                <InputLocationArea>
                    <InputSearchLocationMain type="text" list="israelAddresses" value={searchStreet} onChange={e => setSearchStreet(e.target.value)} placeholder="העיר שלך: ראשון לציון, יבנה, חולון, חיפה " />
                    <datalist id="israelAddresses" >
                        {
                            streets.map((item) => {
                                let value = `${item.city_name}, ${item.street_name}`;
                                return <option>{value}</option>
                            })
                        }
                    </datalist>
                    <SearchSomeBtn>
                        <SearchSome alt="search-location" src="/images/icons8-search-500.png" />
                    </SearchSomeBtn>

                </InputLocationArea>
            </RightData>
        </MainContainer >
    )
}


const MainContainer = styled.footer`{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #fafafa;
  }`

const VideoContainer = styled.div`{
    height: 100vh;
  }`

const VideoBox = styled.video`{
  position: absolute;
  border-radius: 0em 86% 14em 27%;
  top: 44%;
  left: -5em;
  min-width: 70%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: 0;
  transform: translateY(-43%);
  background-size: cover;
  transition: 1s opacity;
  }`

const RightData = styled.div`{
    display: flex;
    flex-direction: column;
    margin-right: 5em;
    margin-top: 2em;
    z-index: 1;
  }`

const RightDataMain = styled.div`{
    display: flex;
    justify-content: flex-end;
    margin-right: 10px;
  }`

const MainElements = styled.div`{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }`


const TextAreaMain = styled.div`{
    text-align: right;
    color: #27407f;
  }`

const SearchSomeBtn = styled.button`{
    background-color: #ffffff00;
    border: none;
    height: 4em;
    position: absolute;
    margin-left: 10px;
}`
const InputLocationArea = styled.div`{
    display: flex;
    align-items: center;

    ${SearchSomeBtn}{
        margin-top: 15px;
    }
}`

const SearchSome = styled.img`{
    height: 3em;
}`

const InputSearchLocationMain = styled.input`{
    height: 5.5em;
    border-radius: 5em;
    border: none;
    width: 50em;
    text-align: right;
    box-shadow: 0px 3px 7px 0px #858383;
    margin-top: 15px;
    outline: none;
    color: #27407f;

    &::placeholder{
        color: #27407f;
        font-size: 22px;
        margin-right: 10px;
    }
}`

export default Main;