import { Switch, Route } from "react-router-dom";

import SideBar from "./SideBar";
import EmptyWrapper from "./EmptyWrapper";
import ContentWrapper from "./ContentWrapper";
import Chart from "./Chart";
import NotFound from "./NotFound";
import LastProductInDb from "./LastProductInDb";
import Statistics from "./Statictics";
import SearchProduct from "./SearchProduct";


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
          <Route component={NotFound} />
        </Switch>
      </EmptyWrapper>
    </div>
  );
}

export default App;
