import React, {Fragment} from "react";
import WishItem from "./wish-item";

const wishData = ({ data, refetch }) => {
  return (
    <Fragment>
      {data.map((data, i) => (
        <WishItem {...data} key={i} refetch={refetch} />
      ))}
    </Fragment>
  );
};

export default wishData;
