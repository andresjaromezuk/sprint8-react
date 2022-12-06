import { Switch, Route } from "react-router-dom";

import SideBar from "./SideBar";
import EmptyWrapper from "./EmptyWrapper";
import ContentWrapper from "./ContentWrapper";
import Chart from "./Chart";
import NotFound from "./NotFound";
import LastProductInDb from "./LastProductInDb";
import Statistics from "./Statictics";
import SearchProduct from "./SearchProduct";
import showAllProducts from "./showAllProducts";
import CreateProduct from "./CreateProduct";
import EditProduct from "./EditProduct"


function App() {
  return (
    <div id="wrapper">
      <SideBar />
      <EmptyWrapper>
        <Switch>
          <Route exact path="/" component={ContentWrapper} />
          <Route path="/search" component={SearchProduct} />
          <Route path="/products" component={Chart} />
          <Route path="/lastProduct" component={LastProductInDb} />
          <Route path="/statistics" component={Statistics} />
          <Route path="/list" component={showAllProducts} />
          <Route path="/create" component={CreateProduct} />
          <Route path="/edit" component={EditProduct} />
          <Route component={NotFound} />
        </Switch>
      </EmptyWrapper>
    </div>
  );
}

export default App;
