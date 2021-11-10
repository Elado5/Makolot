import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {products} from '../api/api';
import {GET} from '../api/fetch';

const Product = (props) => {
    const { product, addItem, removeItem, cartItems } = props;

    return (
        <Card key={product.product_id}>
            <ImageContainer>
                <AddItemIcon>
                    <Button onClick={() => addItem(product)}> + </Button>
                    {cartItems.map((item, key) =>
                        <span key={key}>
                            {product.product_id === item.product_id &&
                                <QtyCart>
                                    <span>{item.qty}</span>
                                    <Button onClick={() => removeItem(product)}> - </Button>
                                </QtyCart>
                            }
                        </span>
                    )}
                </AddItemIcon>

                <Link to={`/product/${product.product_id}`}>
                    <ProductImage src={product.product_image} alt={product.product_name} />
                </Link>
            </ImageContainer>

            <CardBody>
                <BtnAddProduct onClick={() => addItem(product)}> הוספה לסל </BtnAddProduct>

                <RightBlock>
                    <Link to={`/product/${product.product_id}`}>
                        <span>{product.product_name}</span>
                    </Link>

                    <Price>
                        <Currency> ₪ </Currency>
                        {product.product_price.toFixed(2)}
                    </Price>
                </RightBlock>
            </CardBody>
        </Card>
    )
}

const Card = styled.div`{
    margin: 1em;
    width: 17em;
    height: 14.5em;
    padding: 10px;
    border-radius: 1.5rem;
    box-shadow: 0px 8px 12px 0px #c6cbdb;
    background-color: white;
    direction: ltr;
    position: relative;
}`

const ImageContainer = styled.div`{
    display: flex;
    justify-content: center;
}`

const ProductImage = styled.img`{
    height: 9em;
}`

const AddItemIcon = styled.div`{
    display: flex;
    flex-direction: row;
    font-size: xx-large;
    color: #27407f;
    cursor: pointer;
    position: absolute;
    left: 13px;
}`

const Button = styled.button`{
    border: none;
    background-color: transparent;
    color: #27407f;
}`

const QtyCart = styled.div`{
    display: flex;
    justify-content: center;
    align-items: center;
}`

const CardBody = styled.div`{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    height: 65px;
}`

const BtnAddProduct = styled.button`{
    background-color: #27407f;
    color: aliceblue;
    border: none;
    border-radius: 25px;
    height: 2.5em;
    width: 10em;
    font-family: system-ui;
    cursor: pointer;
}`

const RightBlock = styled.div`{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    text-align: right;
    width: 6em;
}`

const Price = styled.div`{
    color: #27407f;
    font-size: 23px;
    font-weight: bold;
}`

const Currency = styled.span`{
    font-size: 15px;
}`

export default Product;