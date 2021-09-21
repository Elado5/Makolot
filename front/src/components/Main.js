import React, {useEffect} from 'react'
import {customers} from '../api/api';
import {GET, POST, PUT, DELETE} from '../api/fetch';

export default function Main() {

    //* Customer
    const LoadSpecificUser = async (id) => {
        let c1 = await GET(customers.get_by_id,[id]);
        console.info(c1);
    }

    const LoadCustomers = async () => {
        let c = await GET(customers.get_all);
        console.table(c);
    }

    const RegisterCustomer = async () => {
    }

    const LoginCustomer = async () => {
    }

    const UpdateCustomer = async () => {
    }

    const DeleteCustomer = async () => {
    }

    //* Address
    const LoadAllAdresses = async () => {}
    const LoadSpecificAdress = async () => {}
    const AddAddress = async () => {}
    const ActivateAddress = async () => {}
    const DeactivateAddress = async () => {}
    const DeleteAddress = async () => {}

    //* Category
    const LoadAllCategories = async () => {}
    const LoadSpecificCategory = async () => {}
    const AddCategory = async () => {}
    const UploadCategoryImage = async () => {}
    const UploadMultipleCategoryImages = async () => {}
    const UpdateCategory = async () => {}
    const ActivateCategory = async () => {}
    const DeactivateCategory = async () => {}
    const DeleteCategory = async () => {}

    //* CAC
    const LoadAllCACs = async () => {}
    const LoadSpecificCAC = async () => {}
    const AddCAC = async () => {}
    const DeleteCAC = async () => {}

    //* Product
    const LoadAllProducts = async () => {}
    const LoadSpecificProduct = async () => {}
    const LoadProductPreview = async () => {}
    const LoadProductPreview2 = async () => {}
    const LoadProductDiscount = async () => {}
    const LoadActiveProducts = async () => {}
    const LoadInactiveProducts = async () => {}
    const AddProduct = async () => {}
    const UploadProductImage = async () => {}
    const UploadMultipleProductImages = async () => {}
    const UpdateProduct = async () => {}
    const ChangeProductDiscount = async () => {}
    const ChangeCategoryDiscount = async () => {}
    const ChangeSubCategoryDiscount = async () => {}
    const CancelAllDiscounts = async () => {}
    const CancelProductDiscount = async () => {}
    const CancelCategoryDiscount = async () => {}
    const CancelSubCategoryDiscount = async () => {}
    const ActivateProduct = async () => {}
    const DeactivateProduct = async () => {}
    const DeleteProduct = async () => {}

    //* Shop
    const LoadAllShops = async () => {}
    const LoadSpecificShop = async () => {}
    const AddShop = async () => {}
    const ActivateShop = async () => {}
    const DeactivateShop = async () => {}
    const DeleteShop = async () => {}

    //* Order
    const LoadAllOrders = async () => {}
    const LoadSpecificOrder = async () => {}
    const AddOrder = async () => {}
    const ActivateOrder = async () => {}
    const DeactivateOrder = async () => {}
    const DeleteOrder = async () => {}

    //בדיקה
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