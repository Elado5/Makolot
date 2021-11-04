import React from 'react';
import styled from 'styled-components';

const SplashLoading = () => {
    return (
        <SplashArea>
            <i className="fa fa-spinner fa-spin"></i>
            <br/>
            <p>Loading...</p>
        </SplashArea>
    )
}

const SplashArea  = styled.div`{
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-direction: column;
    font-size: xx-large;
    height: 100vh;
}`
export default SplashLoading;