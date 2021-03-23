import React from "react";
import { useQuery } from "react-query";
import Back from "../Components/Back";
import { tagsGet } from "../endpoints";
import { fetchProjects } from "../helper";
import TagData from "./tagsData";
import "./tag.css";

const Tags = ({ toggle }) => {
  const { status, data, error, isFetching, isPreviousData } = useQuery(
    ["tagList", tagsGet],
    () => fetchProjects(tagsGet),
    {
      keepPreviousData: true,
      staleTime: 5000,
      cacheTime: 20000,
    }
  );

  return (
    <div className="tag-wrapper">
      <div className="back-container" onClick={toggle}>
        <svg
          viewBox="0 0 16 16"
          className="bi bi-arrow-left-circle rounded"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          width={40}
          height={40}
        >
          <path
            fillRule="evenodd"
            d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
          />
          <path
            fillRule="evenodd"
            d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
          />
        </svg>
      </div>

      {data ? <TagData data={data} toggle={toggle} /> : <>Loading</>}
    </div>
  );
};

export default Tags;
