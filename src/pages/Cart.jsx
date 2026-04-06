import React, { useContext, useEffect, useState } from "react";
import { Auth } from "../context/AuthContext";
import axios from "axios";
import Course from "./Course";

const Cart = () => {
  let { user } = useContext(Auth);
  let [allCart, setAllCart] = useState([]);
  let getCartData = async () => {
    let result = await axios.get(
      `http://localhost:3000/cart?userId=${user.id}`
    );
    setAllCart(result.data);
  };
  useEffect(() => {
    getCartData();
  }, []);
  return (
    <>
      <div className="p-6 flex flex-wrap gap-6 justify-around">
        {allCart.map((el) => {
          return <Course data={el} key={el.id} />;
        })}
      </div>
    </>
  );
};

export default Cart;
