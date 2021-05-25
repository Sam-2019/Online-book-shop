import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import Navigation from "./Navigation/Head";
import Cart from "./Cart/Cart";
import Login from "./User/Login";
import Signup from "./User/Signup";
import PasswordReset from "./User/Password Reset";
import Password from "./User/Password";
import UserVerify from "./User/User Verify";
import AccountVerify from "./User/Account Verify";
import Search from "./Search/SearchDesktop";
import Checkout from "./Checkout/Checkout";
import Order from "./Order/Order";
import Product from "./Product/Product";
import Products from "./Product/Products";
import Profile from "./User/Profile";
import Review from "./Review/Review";
import TagContent from "./Tags/Content";
import NotFound from "./404/404";
import Admin from "./Admin/Admin";

function Desktop() {
  return (
    <div>
      <Navigation />
      <Content />
    </div>
  );
}

function Content() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/admin">
        <Admin />
      </Route>

      <Route path="/checkout">
        <Checkout />
      </Route>
      <Route path="/order/:id">
        <Order />
      </Route>
      <Route path="/user">
        <User />
      </Route>

      <Route path="/account">
        <Account />
      </Route>

      <Route path="/tag/:id">
        <TagContent />
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

      <Route path="/product">
        <ProductPage />
      </Route>

      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

function Home() {
  return (
    <div className="main">
      <Products />
    </div>
  );
}

function ProductPage() {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}/:sku`}>
        <Product />
      </Route>

      <Route path={`${path}/:sku/review`}>
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

export default Desktop;
