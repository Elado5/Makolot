import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { productsAPI } from '../../api/api';
import { GET, POST, PUT, DELETE } from '../../api/fetch';


const AdminProducts = () => {

    const [products, setProducts] = useState([]);
    const [productsLoaded, setProductsLoaded] = useState(false);
    const loadProducts = async () => {
        let res = await GET(productsAPI.get_all);
        setProducts(res);
    }

    //*Making sure the 'products' state is loaded ONCE.
    useEffect(() => {
        if (!productsLoaded) {
            loadProducts();
            setProductsLoaded(true);
        }
        else {
            console.log(`Products Loaded:`, productsLoaded)
        }
    }, [productsLoaded])

    return (
        <PContainer>
            {products && products.map((product, key) => {
                return (
                    <ProductLine>
                        <span>{product.product_id}</span>
                        <span>{product.product_name}</span>
                        <span>update</span>
                        <span>delete</span>
                    </ProductLine>
                )
            })}
        </PContainer>
    )
};

const PContainer = styled.div`{
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: center;
    align-items: center;
    z-index: 3;
    left: 13%;
    padding-top: 13%;
    right: 0;
    width: 80vh;
    border: 1px solid black;
}`

const ProductLine = styled.div`{
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    border: 1px solid black;
    max-height: 3em;
    width: 65vh;
    background-color: rgba(255, 255, 255, 0.8);

}`

export default AdminProducts