import React from "react";
import Bin from "../../Components/Bin";
import Notify from "../../Components/Notify";
import Confirm from "../../Components/Confirm";
import "./wishitem.css";

const WishItem = () => {
  const [notify, setNotify] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);

  const showNotify = () => {
    setNotify(true);

    const timer = setTimeout(() => {
      setNotify(false);
    }, 3000);
    return () => clearTimeout(timer);
  };

  const updateBin = () => {
    setConfirm(true);
  };

  return (
    <div className="item-wrapper  ">
      <div className="item-detail   ">
        <div className="imageXname ">
          <div className="image-placeholder  loading"></div>

          <div className="nameXprice  ">
            <div className="item-name">Name kdhskl the debt toalt deed</div>

            <div className="item-price ">GHc Price</div>

            <div className=" bin-width ">
              <Bin width={18} height={20} action={updateBin} />
            </div>
          </div>
        </div>
      </div>

      {notify ? (
        <Notify message="Item added to cart" close={() => setNotify(false)} />
      ) : null}

      {confirm ? (
        <Confirm close={() => setConfirm(false)}>
          Are you sure you want to remove this item from your wish list?
        </Confirm>
      ) : null}
    </div>
  );
};

export default WishItem;
