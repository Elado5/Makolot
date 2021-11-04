import React, {useEffect} from 'react'
import {customers, addresses, categories, sub_categories, CAC, products, shops, orders} from '../api/api';
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



    const LoginCustomer = async () => {
        let res = await POST(customers.post_login);
    }

    const UpdateCustomer = async (id) => {
        let res = await PUT(customers.put_update, [id]);
    }

    const DeleteCustomer = async (id) => {
        let res = await DELETE(customers.delete_customer, [id]);
    }

    //* Address
    const LoadAllAdresses = async () => {
        let res = await GET(addresses.get_all)
    }
    const LoadSpecificAdress = async (id) => {
        let res = await GET(addresses.get_by_id, [id]);
    }
    const AddAddress = async () => {
        let res = await POST(addresses.post_add)
    }
    const ActivateAddress = async (id) => {
        let res = await PUT(addresses.put_activate, [id]);
    }
    const DeactivateAddress = async (id) => {
        let res = await PUT(addresses.put_deactivate, [id]);

    }
    const DeleteAddress = async (id) => {
        let res = await DELETE(addresses.delete_address, [id])
    }

    //* Category
    const LoadAllCategories = async () => {
        let res = await GET(categories.get_all)
    }
    const LoadSpecificCategory = async (id) => {
        let res = await GET(categories.get_by_id, [id])
    }
    const AddCategory = async () => {
        let res = await POST(categories.post_add)
    }
    const UploadCategoryImage = async () => {
        let res = await POST(categories.post_single_upload)
    }
    const UploadMultipleCategoryImages = async () => {
        let res = await POST(categories.post_multi_upload)

    }
    const UpdateCategory = async (id) => {
        let res = await PUT(categories.put_update, [id])
    }
    const ActivateCategory = async (id) => {
        let res = await PUT(categories.put_activate, [id])
    }
    const DeactivateCategory = async (id) => {
        let res = await PUT(categories.put_deactivate, [id])
    }
    const DeleteCategory = async (id) => {
        let res = await DELETE(categories.delete_category, [id])
    }

      //* Sub_Category
    const LoadAllSubCategories = async () => {
        let res = await GET(sub_categories.get_all)
    }
    const LoadSpecificSubCategory = async (id) => {
        let res = await GET(sub_categories.get_by_id, [id])
    }
    const AddSubCategory = async () => {
        let res = await POST(sub_categories.post_add)
    }
    const UploadSubCategoryImage = async () => {
        let res = await POST(sub_categories.post_single_upload)
    }
    const UploadMultipleSubCategoryImages = async () => {
        let res = await POST(sub_categories.post_multi_upload)

    }
    const UpdateSubCategory = async (id) => {
        let res = await PUT(sub_categories.put_update, [id])
    }
    const ActivateSubCategory = async (id) => {
        let res = await PUT(sub_categories.put_activate, [id])
    }
    const DeactivateSubCategory = async (id) => {
        let res = await PUT(sub_categories.put_deactivate, [id])
    }
    const DeleteSubCategory = async (id) => {
        let res = await DELETE(sub_categories.delete_subcategory, [id])
    }

    //* CAC
    const LoadAllCACs = async () => {
        let res = await GET(CAC.get_all)
    }
    const LoadSpecificCAC = async (id) => {
        let res = await GET(CAC.get_by_id, [id])
    }
    const AddCAC = async () => {
        let res = await POST(CAC.post_add)
    }
    const DeleteCAC = async (id) => {
        let res = await DELETE(CAC.delete_cac, [id])
    }

    //* Product
    const LoadAllProducts = async () => {
        let res = await GET(products.get_all)
    }
    const LoadSpecificProduct = async (id) => {
        let res = await GET(products.get_by_id, [id])
    }
    const LoadProductPreview = async (id) => {
        let res = await GET(products.get_preview_by_id, [id])
    }
    const LoadProductPreview2 = async (id) => {
        let res = await GET(products.get_preview2_by_id, [id])
    }
    const LoadProductDiscount = async (id) => {
        let res = await GET(products.get_product_discount, [id])

    }
    const LoadActiveProducts = async () => {
        let res = await GET(products.get_active_products)
    }
    const LoadInactiveProducts = async () => {
        let res = await GET(products.get_inactive_products)
    }
    const AddProduct = async () => {
        let res = await POST(products.post_add)
    }
    const UploadProductImage = async () => {
        let res = await POST(products.post_single_upload)
    }
    const UploadMultipleProductImages = async () => {
        let res = await POST(products.post_multi_upload)

    }
    const UpdateProduct = async (id) => {
        let res = await PUT(products.put_update, [id])
    }
    const ChangeProductDiscount = async (id) => {
        let res = await PUT(products.put_discount , [id])
    }
    const ChangeCategoryDiscount = async (id) => {
        let res = await PUT(products.put_discount_category , [id])

    }
    const ChangeSubCategoryDiscount = async (id) => {
        let res = await PUT(products.put_discount_subcategory , [id])

    }
    const CancelAllDiscounts = async () => {
        let res = await PUT(products.put_cancel_all_discount)

    }
    const CancelProductDiscount = async (id) => {
        let res = await PUT(products.put_cancel_discount , [id])

    }
    const CancelCategoryDiscount = async (id) => {
        let res = await PUT(products.put_cancel_discount_by_category , [id])

    }
    const CancelSubCategoryDiscount = async (id) => {
        let res = await PUT(products.put_cancel_discount_by_subcategory , [id])

    }
    const ActivateProduct = async (id) => {
        let res = await PUT(products.put_activate , [id])

    }
    const DeactivateProduct = async (id) => {
        let res = await PUT(products.put_deactivate , [id])

    }
    const DeleteProduct = async (id) => {
        let res = await DELETE(products.delete_product, [id])
    }

    //* Shop
    const LoadAllShops = async () => {
        let res = await GET(shops.get_all)
    }
    const LoadSpecificShop = async (id) => {
        let res = await GET(shops.get_by_id, [id])
    }
    const AddShop = async () => {
        let res = await POST(shops.post_add)
    }
    const ActivateShop = async (id) => {
        let res = await PUT(shops.put_activate, [id])
    }
    const DeactivateShop = async (id) => {
        let res = await PUT(shops.put_deactivate, [id])
    }
    const DeleteShop = async (id) => {
        let res = await PUT(shops.put_deactivate, [id])
    }

    //* Order
    const LoadAllOrders = async () => {
        let res = await GET(orders.get_all)
    }
    const LoadSpecificOrder = async (id) => {
        let res = await GET(orders.get_by_id, [id])
    }
    const AddOrder = async () => {
        let res = await POST(orders.post_add)
    }
    const UpdateOrder = async (id) => {
        let res = await PUT(orders.put_update, [id])
    }
    const DeleteOrder = async (id) => {
        let res = await DELETE(orders.delete_order, [id])
    }

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