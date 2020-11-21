import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Main from "./components/Main";
import Login from "./components/Login";
import SinglePost from "./components/SinglePost";
import Register from "./components/Register";

const Routes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/post" component={SinglePost} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
