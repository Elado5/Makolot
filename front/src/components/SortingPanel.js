import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { GET } from '../api/fetch'
import { productsAPI } from '../api/api'

const SortingPanel = ({ products, setProducts }) => {

    //*states
    const [searchBox, setSearchBox] = useState('');

    //*Load products by name form API
    const LoadProductsByName = async (name) => {
        let res = await GET(productsAPI.get_by_name, [name])
        setProducts(res);
    }

    //*When stuff are written in the box, call the load function
    useEffect(() => {
        if (searchBox) {
            if (searchBox === " ") {
                setSearchBox("");
            }
            else if (searchBox !== "") {
                LoadProductsByName(searchBox);
            }
            else {
                //LoadAllProducts(); //doesn't trigger when deleting the text - why?
            }
        }
    }, [searchBox])

    return (
        <SortingPanelBox>
            <ContainerSorting>
                <SortingBtn>
                    <SortingBtnImg alt="sorting" src="/images/icons8-expand-arrow-100.png" />
                    מיין לפי
                </SortingBtn>

                <SortingTagBtn>
                    <SortingBtnImg alt="sorting by tag" src="/images/icons8-slider-100.png" />
                </SortingTagBtn>

            </ContainerSorting>

            <ContainerRight>
                <SearchSomeBtn>
                    <SearchSome alt="search" src="/images/icons8-search-500.png" />
                </SearchSomeBtn>
                <InputSearch type="text" placeholder="חיפוש מוצר" value={searchBox} onChange={(e) => setSearchBox(e.target.value)} />
            </ContainerRight>
        </SortingPanelBox>
    )
}
const SortingPanelBox = styled.div`{
    background-color: #fafafa;
    height: 8em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 95%;
}`

const ContainerSorting = styled.div`{
    width: 20%;
    display: flex;
    justify-content: space-between;
}`

const SortingBtn = styled.button`{
    width: 15em;
    height: 4em;
    border: none;
    border-radius: 20px;
    background-color: white;
    box-shadow: 0px 4px 7px 0px #c6cbdb;
    color: #27407f;
}`

const SortingTagBtn = styled.button`{
    width: 5em;
    height: 4em;
    border: none;
    border-radius: 20px;
    background-color: white;
    box-shadow: 0px 4px 7px 0px #c6cbdb;
}`

const SortingBtnImg = styled.img`{
    height: 3em;
}`

const ContainerRight = styled.div`{
    display: flex;
    align-items: center;
    width: 42%;
    justify-content: space-between;
    margin-right: 35px;
}`

const SearchSomeBtn = styled.button`{
    background-color: #ffffff00;
    border: none;
    height: 4em;
    position: absolute;
    margin-left: 10px;
}`

const SearchSome = styled.img`{
    height: 3em;
}`

const InputSearch = styled.input`{
    height: 4em;
    display: flex;
    align-self: center;
    border: none;
    border-bottom: 2px solid #27407f;
    width: 100%;
    text-align: right;
    font-size: 16px;
    font-weight: bold;
    outline: none;
    color: #27407f;
    background-color: #fafafa;

    &::placeholder{
        color: #27407f;
        font-size: 1.5em;
    }
}`



export default SortingPanel;