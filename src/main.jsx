import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import AuthContext from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";
import CartContext from "./context/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContext>
      <CartContext>
        <App /> <Toaster />
      </CartContext>
    </AuthContext>
  </StrictMode>
);
