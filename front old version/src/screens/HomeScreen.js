import React from 'react'
import data from '../data';
import Products from '../components/Products'
import Main from '../components/Main'
import SalesProductsSlider from '../components/SalesProductsSlider';
import NewProductsSlider from '../components/NewProductsSlider';
import SortingPanel from '../components/SortingPanel';

export default function HomeScreen() {
    return (
        <div>
            <Main />
            <div class="sales-slider">
                <div class="title-slider">המבצעים שלנו</div>
                <div class="article-slider">
                    <div class="carousel-wrapper">
                        <div class="carousel" data-flickity>
                            {data.products.map((product) => (
                                <SalesProductsSlider class="carousel-cell" key={product.product_id} product={product} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>


            <div class="products-area">
                <SortingPanel />
                <div class="products-manage">
                    <div>
                        <div class="article">
                            {data.products.map((product) => (
                                <Products key={product.product_id} product={product}></Products>
                            ))}
                        </div>

                        <div class="sales-slider">
                            <div class="title-slider">מוצרים מובילים</div>
                            <div class="article-slider">
                                <div class="carousel-wrapper">
                                    <div class="carousel" data-flickity>
                                        {data.products.map((product) => (
                                            <NewProductsSlider class="carousel-cell" key={product.product_id} product={product} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="manage-panel">panel</div>
                </div>
            </div>
        </div>
    )
}