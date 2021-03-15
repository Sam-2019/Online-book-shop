import React from "react";
import { useQuery, QueryClient } from "react-query";
import styled from "styled-components";
import { fetchProjects } from "../helper";
import ProductsItem from "./productsItem";
import Placeholder from "../Placeholders/Products";
import "./products.css";

const queryClient = new QueryClient();

const Loading = styled.div`
display: flex,
justify-content: center,


`;

const Products = () => {
  // Queries
  // const { isLoading, isError, data, error, status } = useProducts();
  const [items, setItems] = React.useState(0);
  const [page, setPages] = React.useState(1);

  var formData = new FormData();

  formData.set("offset", items);

  const { status, data, error, isFetching, isPreviousData } = useQuery(
    ["projects", items],
    () => fetchProjects(formData),
    {
      keepPreviousData: true,
      staleTime: 5000,
      cacheTime: 20000,
    }
  );



  // Prefetch the next items!
  React.useEffect(() => {
    if (data?.hasMore) {
      queryClient.prefetchQuery(["projects", items + 1], () =>
        fetchProjects(items + 1)
      );
    }
  }, [data, items]);


  return (
    <>
      <div>
        {status === "loading" ? (
          <Placeholder />
        ) : status === "error" ? (
          <div>Error: {error.message}</div>
        ) : (
          // `data` will either resolve to the latest items's data
          // or if fetching a new items, the last successful items's data
          <div className="products">
            {data.map((items, index) => (
              <ProductsItem key={index} {...items} />
            ))}
          </div>
        )}
      </div>

      <div> {isFetching ? null : <span> Current Page: {page}</span>}</div>

      <div>
        {isFetching ? null : (
          <div>
            <button
              onClick={() => {
                setItems((c) => c - 8);
                setPages((c) => c - 1);
              }}
              disabled={items === 0}
            >
              Previous Page
            </button>
            <button
              onClick={() => {
                setItems((c) => c + 8);
                setPages((c) => c + 1);
              }}
            >
              Next Page
            </button>
          </div>
        )}
      </div>

      <div> {isFetching ? <span> Loading...</span> : null}</div>
    </>
  );
};

export default Products;
