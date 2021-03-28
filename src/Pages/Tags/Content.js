import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Back from "../Components/Back";
import Placeholder from "../Placeholders/Products";
import ContentItem from "./contentItem";

import { tagGet } from "../endpoints";
import { backendData } from "../helper";

const Content = () => {
  let { id } = useParams();

  var formData = new FormData();
  formData.set("tag_title", id);

  const { status, data } = useQuery(
    ["tagContent", id],
    () => backendData(tagGet, formData),
    {
      keepPreviousData: false,
    }
  );

  return (
    <div className="search-wrapper ">
      <div className="header">
        <div className="category">
          <div className="object-1">
            <Back width={30} height={30} />
          </div>
          <div className="object-2">{id} </div>
        </div>
      </div>

      <div className="main">
        {status === "loading" && <Placeholder />}

        {status === "success" && (
          <div className="products2">
            {data.map((items, index) => (
              <ContentItem key={index} {...items} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Content;
