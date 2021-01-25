import React from "react";
import Bin from "../../Components/Bin";
import "./wishitem.css";

const WishItem = () => {
  return (
    <div className="item-wrapper ">
      <div className="item-detail   ">
        <div className="imageXname ">
          <div className="image-placeholder  loading"></div>

          <div className="nameXprice ">
            <div className="item-name">Name kdhskl the debt toalt deed</div>

            <div className="item-price">GHc Price</div>
            <div className=" unknown">
        
            </div>
            <div className=" unknown">
              <Bin width={18} height={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishItem;
