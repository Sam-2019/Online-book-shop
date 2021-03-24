import React from "react";
import { useQuery, QueryClient } from "react-query";
import Loader from "react-loaders";
import styled from "styled-components";
import { fetchProjects } from "../helper";
import ProductsItem from "./productsItem";
import Placeholder from "../Placeholders/Products";
import { itemsGet } from "../endpoints";
import "./products.css";
import "./products.scss";

const queryClient = new QueryClient();

const Loading = styled.div`
  text-align: center;
  margin : 10px 0;
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
          <div className="products">
            {data.map((items, index) => (
              <ProductsItem key={index} {...items} />
            ))}
          </div>
        )}
      </div>

      <Loading>{isFetching ? <Loader type="ball-pulse-sync" active/> : null}</Loading>

      <Navigator>
        <NavigatorActions>
          <Previous onClick={Decrement}>
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.2431 6.34317L14.8288 4.92896L7.75781 12L14.8289 19.0711L16.2431 17.6569L10.5862 12L16.2431 6.34317Z"
                fill="gray"
              />
            </svg>
          </Previous>
          <CurrentPage>{page}</CurrentPage>
          <Next onClick={Increment}>
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5859 6.34314L12.0002 4.92892L19.0712 12L12.0002 19.0711L10.5859 17.6568L16.2428 12L10.5859 6.34314Z"
                fill="gray"
              />
            </svg>
          </Next>
        </NavigatorActions>
      </Navigator>
    </>
  );
};

export default Products;
