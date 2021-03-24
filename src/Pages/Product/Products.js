import React from "react";
import { useQuery, QueryClient } from "react-query";

import styled from "styled-components";

import { fetchProjects } from "../helper";
import ProductsItem from "./productsItem";
import Placeholder from "../Placeholders/Products";
import { itemsGet } from "../endpoints";
import "./products.css";
import "./pagination.css";

const queryClient = new QueryClient();

const Loading = styled.div`
  text-align: center;
`;

const Navigator = styled.div`
  display: flex;
  justify-content: center;
`;

const NavigatorActions = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 10px;
  width: 250px;
  background-color: white;
  border: 1px solid #cccccc;
  margin: 0 0 10px;
  box-shadow: 1px 8px 11px -6px rgba(82, 82, 82, 0.75);
  -webkit-box-shadow: 1px 8px 11px -6px rgba(82, 82, 82, 0.75);
  -moz-box-shadow: 1px 8px 11px -6px rgba(82, 82, 82, 0.75);

  @media (max-width: 540px) {
    width: 95%;
  }
`;

const CurrentPage = styled.div`
  font-size: 20px;
  width: 80px;
  text-align: center;
  padding: 5px 0;
  border-right: 1px solid #cccccc;
  border-left: 1px solid #cccccc;

  @media (max-width: 540px) {
    width: 130px;
  }
`;

const Previous = styled.div`
  text-align: center;
  padding: 5px 0;
  transition: transform 80ms ease-in;

  :active {
    transform: scale(0.95);
  }
`;

const Next = styled.div`
  text-align: center;
  padding: 5px 0;
  transition: transform 80ms ease-in;

  :active {
    transform: scale(0.95);
  }
`;

const Products = () => {
  // Queries
  // const { isLoading, isError, data, error, status } = useProducts();
  const [items, setItems] = React.useState(0);
  const [page, setPages] = React.useState(1);

  var formData = new FormData();

  formData.set("offset", items);

  function Increment() {
    setItems((c) => c + 8);
    setPages((c) => c + 1);
  }

  function Decrement() {
    if (page <= 1) {
      return;
    } else {
      setItems((c) => c - 8);
      setPages((c) => c - 1);
    }
  }

  const { status, data, error, isFetching, isPreviousData } = useQuery(
    ["projects", items, itemsGet],
    () => fetchProjects(itemsGet, formData),
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

      {/* <Loading>
        {isFetching ? null : <span> Current Page: {page}</span>}
      </Loading> */}

      <Loading>{isFetching ? <span> Loading...</span> : null}</Loading>

      <Navigator>
        <NavigatorActions>
          <Previous onClick={Decrement}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={25}
              height={25}
              fill="currentColor"
              className="bi bi-chevron-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
            </svg>
          </Previous>
          <CurrentPage>{page}</CurrentPage>
          <Next onClick={Increment}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={25}
              height={25}
              fill="currentColor"
              className="bi bi-chevron-right"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </Next>
        </NavigatorActions>
      </Navigator>
    </>
  );
};

export default Products;
