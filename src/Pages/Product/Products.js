import React from "react";
import { useQuery, QueryClient } from "react-query";
import { fetchProjects } from "../helper";
import ProductsItem from "./productsItem";
import "./products.css";

const queryClient = new QueryClient();

const Products = () => {
  // Queries
  // const { isLoading, isError, data, error, status } = useProducts();
  const [page, setPage] = React.useState(0);
  const { status, data, error, isFetching, isPreviousData } = useQuery(
    ["projects", page],
    () => fetchProjects(page),
    {
      keepPreviousData: true,
      staleTime: 5000,
    }
  );

  // Prefetch the next page!
  React.useEffect(() => {
    if (data?.hasMore) {
      queryClient.prefetchQuery(["projects", page + 1], () =>
        fetchProjects(page + 1)
      );
    }
  }, [data, page]);

  return (
    <>
      <div>
        {status === "loading" ? (
          <div>Loading...</div>
        ) : status === "error" ? (
          <div>Error: {error.message}</div>
        ) : (
          // `data` will either resolve to the latest page's data
          // or if fetching a new page, the last successful page's data
          <div className="products">
            {data.map((items, index) => (
              <ProductsItem key={index} {...items} />
            ))}
          </div>
        )}

        {/* {status === "loading" ? (
        <>Loading...</>
      ) : status === "error" ? (
        <>Error: {error.message}</>
      ) : (
        <>
          {data.map((items, index) => (
            <ProductsItem key={index} {...items} />
          ))}
        </>
      )} */}
        {/* {Array(10)
        .fill()
        .map((item, index) => (
          <ProductsItem key={index} index={index} />
        ))} */}
      </div>

      <div>Current Page: {page + 1}</div>

      <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 0}
      >
        Previous Page
      </button>

      <button
        onClick={() => {
          setPage((old) => (data?.hasMore ? old + 1 : old));
        }}
        disabled={isPreviousData || !data?.hasMore}
      >
        Next Page
      </button>
      {
        // Since the last page's data potentially sticks around between page requests,
        // we can use `isFetching` to show a background loading
        // indicator since our `status === 'loading'` state won't be triggered
        isFetching ? <span> Loading...</span> : null
      }
    </>
  );
};

export default Products;
