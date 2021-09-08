import React from 'react'

const SortingPanel = () => {
    return (
        <div className="sorting-panel">


            <div className="container-sorting">
                <button className="sorting-btn">
                        <img className="" alt="sorting" src="/images/icons8-expand-arrow-100.png" />
                        מיין לפי
                </button>

                <button className="sorting-tag-btn">
                    <img className="" alt="sorting by tag" src="/images/icons8-slider-100.png" />
                </button>

            </div>

            <div className="container-search">
                <button className="search-some-btn">
                    <img className="search-some" alt="search" src="/images/icons8-search-500.png" />
                </button>
                <input className="input-search" type="text" placeholder="חיפוש מוצר" />
            </div>
        </div>
    )
}
export default SortingPanel;