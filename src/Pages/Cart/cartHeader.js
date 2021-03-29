import React from 'react'

const cartHeader = () => {
    return (
        <div className="cart_item_wrapper">
        <div className="checkBox">
          <input type="checkbox" value="0" hidden />
        </div>

        <div className="cart-item-detail ">
          <div className="imageXname ">
            <div className="item-name">Product name</div>

            <div className="item-price">Price</div>
          </div>

          <div className="priceXactions">
            <div className="binXaddXsubtract">Quantity</div>
          </div>
        </div>
      </div>
    )
}

export default cartHeader
