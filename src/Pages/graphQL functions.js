import { gql } from "@apollo/client";

export const ADD_PRODUCT = gql`
  mutation AddProduct(
    $name: String!
    $sku: String!
    $price: String!
    $imageURL: String!
    $quantity: Int!
    $author: String!
    $detail: String!
  ) {
    addProduct(
      name: $name
      sku: $sku
      price: $price
      imageURL: $imageURL
      quantity: $quantity
      author: $author
      detail: $detail
    ) {
      id
      name
      sku
      price
      imageURL
      quantity
      author
      detail
    }
  }
`;
export const GET_PRODUCT = gql`
  query Product($sku: String!) {
    product(sku: $sku) {
      id
      name
      sku
      author
      price
      imageURL
      quantity
      detail
    }
  }
`;
export const GET_PRODUCTS = gql`
  query {
    products {
      id
      name
      sku
      price
      imageURL
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

export const ADD_CART = gql`
  mutation AddCart(
    $user: ID!
    $product: ID!
    $quantity: String!
    $price: String!
  ) {
    addCart(
      user: $user
      product: $product
      quantity: $quantity
      price: $price
    ) {
      id
      user
      price
      quantity
    }
  }
`;

export const GET_CART = gql`
  query Carts($id: ID!) {
    carts(id: $id) {
      cartID
      productID
      sku
      name
      author
      price
      imageURL
      quantity
    }
  }
`;

export const DELETE_CART = gql`
  mutation DeleteCart($id: ID!, $user: ID!) {
    deleteCart(id: $id, user: $user) {
      id
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup(
    $password: String!
    $first_name: String!
    $last_name: String!
    $email: String!
  ) {
    signup(
      password: $password
      first_name: $first_name
      last_name: $last_name
      email: $email
    ) {
      id
      password
      first_name
      last_name
      email
    }
  }
`;

export const LOGIN = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user
      token
      tokenexpiration
    }
  }
`;

export const ADD_WISHLIST = gql`
  mutation AddWishlist($user: ID!, $product: ID!) {
    addWishlist(user: $user, product: $product) {
      id
      user
      product
    }
  }
`;

export const GET_WISHLIST = gql`
  query Wishlist($id: ID!) {
    wishlist(id: $id) {
      wishID
      productID
      name
      sku
      price
      imageURL
    }
  }
`;

export const DELETE_WISHLIST = gql`
  mutation DeleteWishlist($id: ID!) {
    deleteWishlist(id: $id) {
      id
    }
  }
`;

export const ADD_ORDER = gql`
  mutation AddOrder(
    $user: ID!
    $products: [ID]
    $orderNumber: String
    $orderValue: String
  ) {
    addOrder(
      user: $user
      products: $products
      orderNumber: $orderNumber
      orderValue: $orderValue
    ) {
      id
      user
      orderNumber
      orderValue
    }
  }
`;

export const GET_ORDER = gql`
  query UserOrder($id: ID!) {
    userOrder(id: $id) {
      id
      name
      sku
      status
      quantity
      price
      imageURL
    }
  }
`;

export const DELETE_ORDER = gql`
  mutation DeleteOrder($id: ID!) {
    deleteOrder(id: $id) {
      id
    }
  }
`;
