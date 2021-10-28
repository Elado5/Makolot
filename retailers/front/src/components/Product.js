import React from 'react'
import { Link } from 'react-router-dom';



const Product = (props) => {

    const { product, addItem, removeItem, cartItems } = props;

  

    return (
        <div key={product.product_id} className="card">
            <div className="image-container">
                <span className="add-item-icon">
                    <button onClick={() => addItem(product)} className="button-add">+</button>
                    {cartItems.map((item, key) =>
                        <span key={key}>
                            {
                                product.product_id === item.product_id &&
                                <div className="qty-cart">
                                    <span>{item.qty}</span>
                                    <button onClick={() => removeItem(product)} className="button-remove">-</button>
                                </div>
                            }
                        </span>
                    )}

                </span>

                <Link to={`/product/${product.product_id}` }>
                    <img className="product-image"
                        src={product.product_image}
                        alt={product.product_name} />
                </Link>
            </div>

            <div className="card-body">
                <button onClick={() => addItem(product)} className="btn-add-product">הוספה לסל</button>

                <div className="right-block">
                    <Link to={`/product/${product.product_id}`}>
                        <span>{product.product_name}</span>
                    </Link>

                    <div className="price">
                        <span className="currency">₪</span>
                        {product.product_price.toFixed(2)}</div>
                </div>
            </div>
        </div>
    )
}
export default Product;