import React from 'react'

export default function NewProductsSlider(props) {
    const { product } = props;
    return (
        <div key={product.product_id} class="card">
            <div class="image-container">
                <span class="add-item-icon ">+</span>
                <a href={`/product/${product.product_id}`}>
                    <img class="product-image"
                        src={product.product_image}
                        alt={product.product_name} />
                </a>
            </div>

            <div class="card-body">
                <button class="btn-add-product">הוספה לסל</button>

                <div class="right-block">
                    <a href={`/product/${product.product_id}`}>
                        <span>{product.product_name}</span>
                    </a>

                    <div className="price">
                        <span class="currency">₪</span>
                        {product.product_price}</div>
                </div>
            </div>
        </div>
    )
}
