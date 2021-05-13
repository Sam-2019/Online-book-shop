import React from "react";
import { useQuery} from "@apollo/client";
import ProductsItem from "./productsItem";
import Placeholder from "../Placeholders/Products";
import {
  Loading,
  Navigator,
  NavigatorActions,
  CurrentPage,
  Previous,
  Next,
  Spacer,
} from "../styles";
import "./products.css";
import { GET_PRODUCTS } from "../graphQL functions";

const Products = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading)
    return (
      <Loading>
        <Placeholder />
      </Loading>
    );

  if (error)
    return (
      <Loading>
        <p>Error :(</p>
      </Loading>
    );

  return (
    <Loading>
      {data && (
        <div className="products">
          {data.products.map((items, index) => (
            <ProductsItem key={index} {...items} />
          ))}
        </div>
      )}

      <Spacer />

      <Navigator>
        <NavigatorActions>
          <Previous>
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
          <CurrentPage>1</CurrentPage>
          <Next>
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
    </Loading>
  );
};

export default Products;
