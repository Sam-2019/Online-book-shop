import { gql } from "@apollo/client";

export const SEARCH = gql`
  query Search($text: String!) {
    search(text: $text) {
      id
      name
      author
      price
      imageURL
      sku
    }
  }
`;

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
      rating
      detail
      review {
        id
        rating
        text
        createdAt
        user {
          firstName
          lastName
          photoURL
        }
      }
    }
  }
`;

export const GET_PRODUCTS = gql`
  query Data($limit: Int!, $offset: Int!) {
    products(limit: $limit, offset: $offset) {
      count
      data {
        id
        name
        sku
        price
        imageURL
      }
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
  mutation AddCart($product: ID!, $quantity: String!, $price: String!) {
    addCart(product: $product, quantity: $quantity, price: $price) {
      id
      user
      price
      quantity
    }
  }
`;

export const GET_CART = gql`
  query {
    carts {
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
  mutation DeleteCart($id: ID!) {
    deleteCart(id: $id) {
      id
    }
  }
`;

export const INCREMENT_QUANTITY = gql`
  mutation IncrementCartItem($product: ID!, $quantity: String!) {
    incrementCartItem(product: $product, quantity: $quantity) {
      product
      quantity
    }
  }
`;

export const DECREMENT_QUANTITY = gql`
  mutation DecrementCartItem($product: ID!, $quantity: String!) {
    decrementCartItem(product: $product, quantity: $quantity) {
      product
      quantity
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup(
    $password: String!
    $firstName: String!
    $lastName: String!
    $email: String!
  ) {
    signup(
      password: $password
      firstName: $firstName
      lastName: $lastName
      email: $email
    ) {
      id
      password
      firstName
      lastName
      email
    }
  }
`;

export const LOGIN = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      firstName
      lastName
      email
      verified
      token
      tokenexpiration
    }
  }
`;

export const ADD_WISHLIST = gql`
  mutation AddWishlist($product: ID!) {
    addWishlist(product: $product) {
      id
      user
      product
    }
  }
`;

export const GET_WISHLIST = gql`
  query {
    wishlist {
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
  mutation AddOrder($products: [ID], $orderNumber: String) {
    addOrder(products: $products, orderNumber: $orderNumber) {
      id
      orderNumber
      orderValue
    }
  }
`;

export const GET_ORDER = gql`
  query {
    userOrder {
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

export const DELETE_ORDER_ITEM = gql`
  mutation DeleteOrderItem($id: ID!) {
    deleteOrderItem(id: $id) {
      id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $password: String
    $username: String
    $firstName: String
    $lastName: String
    $email: String
    $phone_number: String
  ) {
    updateUser(
      password: $password
      username: $username
      firstName: $firstName
      lastName: $lastName
      email: $email
      phone_number: $phone_number
    ) {
      id
      username
      password
      lastName
      lastName
      email
      photoURL
      phone_number
      verified
    }
  }
`;

export const UPDATE_NAME = gql`
  mutation UpdateUserName($firstName: String, $lastName: String) {
    updateUserName(firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation UpdateUserPassword($password: String, $new_password: String) {
    updateUserPassword(password: $password, new_password: $new_password) {
      id
      password
    }
  }
`;

export const UPDATE_EMAIL = gql`
  mutation UpdateUserEmail($email: String, $new_email: String) {
    updateUserEmail(email: $email, new_email: $new_email) {
      id
      email
    }
  }
`;

export const UPDATE_USERNAME = gql`
  mutation UpdateUserDetail($username: String) {
    updateUserDetail(username: $username) {
      id
      username
    }
  }
`;

export const UPDATE_PHONE_NUMBER = gql`
  mutation UpdateUserDetail($phone_number: String) {
    updateUserDetail(phone_number: $phone_number) {
      id
      phone_number
    }
  }
`;

export const UPDATE_VERIFICATION = gql`
  mutation UpdateUserDetail($verified: Boolean) {
    updateUserDetail(verified: $verified) {
      id
      verified
    }
  }
`;

export const GET_VERIFICATION = gql`
  query {
    verification {
      verified
    }
  }
`;

export const UPDATE_PHOTOURL = gql`
  mutation UpdateUserDetail($photoURL: String) {
    updateUserDetail(photoURL: $photoURL) {
      id
      photoURL
    }
  }
`;

export const GET_USER = gql`
  query {
    user {
      id
      firstName
      lastName
      email
      verified
      photoURL
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation AddReview($product: ID, $rating: Int, $text: String) {
    addReview(product: $product, rating: $rating, text: $text) {
      id
    }
  }
`;

export const GET_PRODUCT_REVIEWS = gql`
  query Review($sku: String!) {
    reviews(sku: $sku) {
      id
      user {
        firstName
        lastName
        photoURL
      }
      text
      rating
      createdAt
    }
  }
`;

export const ADD_PAYMENT = gql`
  mutation AddPayment(
    $method: String!
    $momoName: String!
    $momoNumber: String!
    $momoTransactionID: String!
    $orderNumber: String!
    $location: String
    $address: String
    $phoneNumber: String
  ) {
    addPayment(
      method: $method
      momoName: $momoName
      momoNumber: $momoNumber
      momoTransactionID: $momoTransactionID
      orderNumber: $orderNumber
      location: $location
      address: $address
      phoneNumber: $phoneNumber
    ) {
      id
      method
      momoName
      momoNumber
      momoTransactionID
      orderNumber
      location
      phoneNumber
    }
  }
`;

export const GET_LOCATIONS = gql`
  query {
    location {
      id
      location
      fee
      disable
    }
  }
`;

export const ADD_LOCATION = gql`
  mutation AddLocation($location: String!, $fee: String!) {
    addLocation(location: $location, fee: $fee) {
      id
      location
      fee
    }
  }
`;
export const GET_ORDER_AMOUNT = gql`
  query GetOrderAmount($orderNumber: String!) {
    getOrderAmount(orderNumber: $orderNumber) {
      orderValue
    }
  }
`;
