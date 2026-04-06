import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { Auth } from "./AuthContext";
import toast from "react-hot-toast";

export const CartData = createContext();

const CartContext = ({ children }) => {
  const { user } = useContext(Auth);
  const [cart, setCart] = useState([]);

  const addToCart = async (course) => {
    const getData = await axios.get(
      `http://localhost:3000/cart?userId=${user.id}&courseId=${course.id}`
    );

    if (getData.data.length > 0) {
      toast.error("Already added to cart..");
      return;
    }

    const cartObject = {
      ...course,
      userId: user.id,
      courseId: course.id,
    };

    const result = await axios.post("http://localhost:3000/cart", cartObject);

    toast.success("Added to cart");
    setCart([...cart, result.data]);
  };

  return (
    <CartData.Provider value={{ addToCart, cart }}>
      {children}
    </CartData.Provider>
  );
};

export default CartContext;
