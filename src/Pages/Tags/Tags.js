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
        <Back width={40} height={40} />
      </div>

      {data ? <TagData data={data} toggle={toggle} /> : <>Loading</>}
    </div>
  );
};

export default Tags;
