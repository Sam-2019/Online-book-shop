import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import styled from "styled-components";
import { MediaQuery } from "./helper";
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

const Main = styled.div`
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  transition: all 0.6s ease-in-out;
  min-height: 30em;
`;

const breakpoint = 540;

const Okukus = () => {
  const { width } = MediaQuery();

  return <Router>{width > breakpoint ? <Deskotp /> : <Mobile />}</Router>;
};

export default Okukus;

function Deskotp() {
  return (
    <>
      <Navigation />

      <Content />
    </>
  );
}


function Mobile() {
  return <Content />;
}


function Content() {
  return (
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
  );
}

function Home() {
  const { width } = MediaQuery();
  return (
    <>
      {width > breakpoint ? (
        <div className="main">
          <Products />
        </div>
      ) : (
        <>
          <Navigation />

          <div className="main">
            <Products />
          </div>
        </>
      )}
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
  let { width } = MediaQuery();
  return (
    <Switch>
      <Route path={`${path}/profile`}>
        <Profile />
      </Route>

      <Route path={`${path}/verify/:id`}>
        <UserVerify />
      </Route>

      {width > breakpoint ? null : (
        <Route path={`${path}/order history`}>
          <OrderHistory />
        </Route>
      )}

      {width > breakpoint ? null : (
        <Route path={`${path}/wishlist`}>
          <WishList />
        </Route>
      )}

      {/* <Route path={`${path}/order history`}>
        <OrderHistory />
      </Route>

      <Route path={`${path}/wishlist`}>
        <WishList />
      </Route> */}
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
