import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const Product = (props) => {
    const { shop} = props;


    return (
        <Card key={shop.grocery_shop_id}>
            <CardBody>
                <RightBlock>
                    <Title>{shop.grocery_shop_name}</Title>
                    
                    <SubText> 
                        {shop.grocery_shop_city}
                    </SubText>
                    
                    <SubText>
                        {shop.grocery_shop_opening_times}
                    </SubText>

                    <SubText>
                    {shop.grocery_shop_phone_number}
                    </SubText>
                </RightBlock>
            </CardBody>
        </Card>
    )
}

const Card = styled.div`{
    margin: 1em;
    width: 17em;
    height: 15.5em;
    padding: 10px;
    border-radius: 1.5rem;
    direction: ltr;
    position: relative;       
    box-shadow: 0px 8px 15px 0px rgba(34, 71, 154, 0.5);
    background: linear-gradient(0deg, rgba(15,75,322,0.2) 0%, rgba(9,9,121,0.1) 35%, rgba(0,125,255,0.2) 100%);
    &:hover {
        box-shadow: 0px 8px 15px 0px rgba(44, 71, 154, 0.8);
        transition: 0.53s ease;
    }
    text-overflow: ellipsis;
}`


const CardBody = styled.div`{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30%;
    width: 100%;
}`


const Title = styled.div`{
    font-size: 2.5rem;
    padding-bottom: 0.5rem;
    text-shadow: 0px 0px 3px darkgray;
}`

const RightBlock = styled.div`{
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 50%;
    height: 50%;
}`

const SubText = styled.div`{
    color: #27407f;
    font-size: 1.5rem;
    font-weight: bold;
}`

export default Product;