import { baseAPI } from './baseAPI';

export const customersAPI = {
    get_all: `${baseAPI}/customers/all`,
    get_by_id: `${baseAPI}/customers/`,
    post_register: `${baseAPI}/customers/register`,
    post_login: `${baseAPI}/customers/login`,
    put_update: `${baseAPI}/customers/update`,
    put_update_card: `${baseAPI}/customers/update_card`,
    delete_customer: `${baseAPI}/customers/delete`
}

export const retailersAPI = {
    get_all: `${baseAPI}/managers/all`,
    get_by_id: `${baseAPI}/managers/`,
    post_register: `${baseAPI}/managers/register`,
    post_login: `${baseAPI}/managers/login`,
    put_update: `${baseAPI}/managers/update/`,
    delete_retailer: `${baseAPI}/managers/delete/`
}

export const adminsAPI = {
    post_register: `${baseAPI}/admins/register`,
    post_login: `${baseAPI}/admins/login`,
    delete_admin: `${baseAPI}/admins/delete`
}

export const addressesAPI = {
    get_all: `${baseAPI}/addresses/all`,
    get_by_id: `${baseAPI}/addresses/`,
    get_preview_by_id: `${baseAPI}/addresses/preview/`,
    post_add: `${baseAPI}/addresses/add`,
    put_activate: `${baseAPI}/addresses/activate/`,
    put_deactivate: `${baseAPI}/addresses/deactivate/`,
    put_update: `${baseAPI}/addresses/update/`,
    delete_address: `${baseAPI}/addresses/delete/`
}

export const categoriesAPI = {
    get_all: `${baseAPI}/categories/all`,
    get_by_id: `${baseAPI}/categories/`,
    post_add: `${baseAPI}/categories/add`,
    post_single_upload: `${baseAPI}/categories/singleUp`,
    post_multi_upload: `${baseAPI}/categories/multipleUp`,
    put_update: `${baseAPI}/categories/update/`,
    put_activate: `${baseAPI}/categories/activate/`,
    put_deactivate: `${baseAPI}/categories/deactivate/`,
    delete_category: `${baseAPI}/categories/delete/`
}

export const sub_categoriesAPI = {
    get_all: `${baseAPI}/subcategories/all`,
    get_by_id: `${baseAPI}/subcategories/`,
    get_by_category_id: `${baseAPI}/subcategories/byCategory`,
    post_add: `${baseAPI}/subcategories/add`,
    post_single_upload: `${baseAPI}/subcategories/singleUp`,
    post_multi_upload: `${baseAPI}/subcategories/multipleUp`,
    put_update: `${baseAPI}/subcategories/update/`,
    put_activate: `${baseAPI}/subcategories/activate/`,
    put_deactivate: `${baseAPI}/subcategories/deactivate/`,
    delete_subcategory: `${baseAPI}/subcategories/delete/`
}

export const CACAPI = {
    get_all: `${baseAPI}/CAC/all`,
    get_by_id: `${baseAPI}/CAC/`,
    post_add: `${baseAPI}/CAC/add`,
    delete_cac: `${baseAPI}/CAC/delete/`
}

export const productsAPI = {
    get_all: `${baseAPI}/products/all`,
    get_all_discounted: `${baseAPI}/products/all_discounted`,
    get_by_id: `${baseAPI}/products/by_id/`,
    get_by_name: `${baseAPI}/products/by_name/`,
    get_by_category: `${baseAPI}/products/bycategory/`,
    get_by_sub_category: `${baseAPI}/products/bysubcategory/`,
    get_preview_by_id: `${baseAPI}/products/preview/`,
    get_preview2_by_id: `${baseAPI}/products/preview2/`,
    get_product_discount: `${baseAPI}/products/discount/`,
    get_active_products: `${baseAPI}/products/allactive`,
    get_inactive_products: `${baseAPI}/products/allinactive`,
    post_add: `${baseAPI}/products/add`,
    post_single_upload: `${baseAPI}/products/singleUp`,
    post_multi_upload: `${baseAPI}/products/multipleUp`,
    put_update: `${baseAPI}/products/update/`,
    put_update_image: `${baseAPI}/products/update/image/:id`,
    put_activate: `${baseAPI}/products/activate/`,
    put_deactivate: `${baseAPI}/products/deactivate/`,
    put_discount: `${baseAPI}/products/discount/`,
    put_discount_category: `${baseAPI}/products/discount/category/`,
    put_discount_subcategory: `${baseAPI}/products/discount/subcategory/`,
    put_cancel_all_discount: `${baseAPI}/products/discount/cancelAll`,
    put_cancel_discount: `${baseAPI}/products/discount/cancel/`,
    put_cancel_discount_by_category: `${baseAPI}/products/discount/cancelCategory/`,
    put_cancel_discount_by_subcategory: `${baseAPI}/products/discount/cancelSubCategory/`,
    delete_product: `${baseAPI}/products/delete/`
}

export const shopsAPI = {
    get_all: `${baseAPI}/shops/all`,
    get_by_id: `${baseAPI}/shops/`,
    get_by_name: `${baseAPI}/shops/byName/`,
    get_by_city: `${baseAPI}/shops/byCity/`,
    post_add: `${baseAPI}/shops/add`,
    put_update: `${baseAPI}/shops/update/`,
    put_activate: `${baseAPI}/shops/activate/`,
    put_deactivate: `${baseAPI}/shops/deactivate/`,
    delete_shop: `${baseAPI}/shops/delete/`
}

export const ordersAPI = {
    get_all: `${baseAPI}/orders/all`,
    get_by_id: `${baseAPI}/orders/`,
    post_add: `${baseAPI}/orders/add`,
    put_update: `${baseAPI}/orders/update/`,
    delete_order: `${baseAPI}/orders/delete/`
}

//? Transaction route?
//? invoice route?
//? Credit Card route?
//!leaving that to the owner of the site to chose the relevant way of handling transactions/payment.