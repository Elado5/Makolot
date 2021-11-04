import React from 'react'
import SalesProductsSlider from '../components/SalesProductsSlider';
import data from '../data'

export default function ProductScreen(props) {

    const item = data.products.find((x) => x.product_id === props.match.params.id);

    if (!item) {
        return <div>Product not found</div>
    }

    return (
        <div class="container-prod">
            <div class="product-container-popup">
                <div>X</div>

                <div class="product-data">
                    <div class="product-left-description">
                        <div>{item.product_name}</div>
                        <div>{item.product_price}</div>
                        <span>מאפיינים</span>
                        <div>{item.product_description}</div>

                        <button class="btn-add-product">הוספה לסל</button>
                    </div>

                    <div class="product-right-cont">
                        <span class="add-item-icon"> + 1 - </span>
                        <img class="product-item-image" src={item.product_image} alt={item.product_name} />
                    </div>
                </div>

                <hr />
                <div class="product-popular ">
                    <div class="title-slider">מוצרים דומים</div>
                    <div class="product-slider">
                        <div class="carousel-wrapper">
                            <div data-flickity class="carousel">
                                {data.products.map((product) => (
                                    <SalesProductsSlider class="carousel-cell" key={product.product_id} product={product} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
