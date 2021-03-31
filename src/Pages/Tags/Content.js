import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Back from "../Components/Back";
import Placeholder from "../Placeholders/Products";
import ContentItem from "./contentItem";
import { tagGet } from "../endpoints";
import { fetch } from "../helper";

const Content = () => {
  let { id } = useParams();

  var formData = new FormData();
  formData.set("tag_title", id);

  const { status, data } = useQuery(["tagContent", id, tagGet], () =>
    fetch(tagGet, formData)
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
          <div className="products">
            {data.data.map((data, index) => (
              <ContentItem {...data} key={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Content;
