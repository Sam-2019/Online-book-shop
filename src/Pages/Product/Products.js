import React from "react";
import { useQuery, QueryClient } from "react-query";
//import Loader from "react-loaders";
import ProductsItem from "./productsItem";
import Placeholder from "../Placeholders/Products";
import { itemsGet } from "../endpoints";
import Loader from "../Loader/loader";
import { fetch } from "../helper";
import {
  Loading,
  Navigator,
  NavigatorActions,
  CurrentPage,
  Previous,
  Next,
} from "./styles";
import "./products.css";

const queryClient = new QueryClient();

const Products = () => {
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
    ["products", items, itemsGet],
    () => fetch(itemsGet, formData),
    {
      keepPreviousData: true,
      staleTime: 5000,
      cacheTime: 20000,
    }
  );

  React.useEffect(() => {
    if (data?.hasMore) {
      queryClient.prefetchQuery(["projects", items + 1], () =>
        fetch(items + 1)
      );
    }
  }, [data, items]);

  return (
    <>
      <div>
        {/* {status === "loading" ? (
          <Placeholder />
        ) : status === "error" ? (
          <div>Error: {error.message}</div>
        ) : (
          <div className="products">
            {data.map((items, index) => (
              <ProductsItem key={index} {...items} />
            ))}
          </div>
        )} */}

        {status === "loading" && <Placeholder />}

        {status === "error" && <div>Error: {error.message}</div>}

        {status === "success" && (
          <div className="products">
            {data.map((items, index) => (
              <ProductsItem key={index} {...items} />
            ))}
          </div>
        )}
        
      </div>

      <Loading>
        {isFetching ? (
          <Loader />
        ) : (
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
        )}
      </Loading>
    </>
  );
};

export default Products;
