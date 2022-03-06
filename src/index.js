import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ProductsProvider } from "./context/products_context";
import { FilterProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { UserProvider } from "./context/user_context";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";

// ismoil-dev.us.auth0.com
// aRVI2zj9zknoDx9RenVZCIzc3KTIKzLk

ReactDOM.render(
  <Auth0Provider
    domain="ismoil-dev.us.auth0.com"
    clientId="aRVI2zj9zknoDx9RenVZCIzc3KTIKzLk"
    redirectUri={window.location.origin}
    cacheLocation="localstorage"
  >
    <UserProvider>
      <ProductsProvider>
        <CartProvider>
          <FilterProvider>
            <App />
          </FilterProvider>
        </CartProvider>
      </ProductsProvider>
    </UserProvider>

  </Auth0Provider>,
  document.getElementById("root")
);
