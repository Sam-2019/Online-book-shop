import React, {Fragment} from "react";
import WishItem from "./wish-item";

const wishData = ({ data }) => {
  return (
    <Fragment>
      {data.map((data, i) => (
        <WishItem {...data} key={i} />
      ))}
    </Fragment>
  );
};

export default wishData;
