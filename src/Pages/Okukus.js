import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
  Redirect,
} from "react-router-dom";
import styled from "styled-components";
import Navigation from "./Navigation/Navigation";
import Cart from "./Cart/Cart";
import Login from "./User/Login";
import Signup from "./User/Signup";
import PasswordReset from "./User/Password Reset";
import Password from "./User/Password";
import UserVerify from "./User/User Verify";
import AccountVerify from "./User/Account Verify";
import OrderHistory from "./User/Profile/Order History";
import WishList from "./User/Profile/Wish List";
import Search from "./Search/Search";
import Checkout from "./Checkout/Checkout";
import Order from "./Order/Order";
import Product from "./Product/Product";

import Products from "./Product/Products";

import Profile from "./User/Profile";
import Review from "./Review/Review";

const Okukus = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/checkout">
          <Checkout />
        </Route>

        <Route path="/order/:id">
          <Order />
        </Route>

        <Route path="/cart">
          <Cart />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/signup">
          <Signup />
        </Route>

        <Route path="/search">
          <Search />
        </Route>

        <Route path="/user">
          <User />
        </Route>

        <Route path="/account">
          <Account />
        </Route>

        <Route path="/product">
          <ProductPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default Okukus;

function Home() {
  return (
    <>
      <Navigation />

      <div className="products ">
        <Products />
      </div>
    </>
  );
}

function ProductPage() {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}/:id`}>
        <Product />
      </Route>

      <Route path={`${path}/:id/review`}>
        <Review />
      </Route>
    </Switch>
  );
}

function User() {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/profile`}>
        <Profile />
      </Route>

      <Route path={`${path}/verify/:id`}>
        <UserVerify />
      </Route>

      <Route path={`${path}/orderhistory`}>
        <OrderHistory />
      </Route>

      <Route path={`${path}/wishlist`}>
        <WishList />
      </Route>
    </Switch>
  );
}

function Account() {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/verify/:id`}>
        <AccountVerify />
      </Route>

      <Route path={`${path}/reset/pwd`}>
        <Password />
      </Route>

      <Route path={`${path}/reset`}>
        <PasswordReset />
      </Route>
    </Switch>
  );
}
