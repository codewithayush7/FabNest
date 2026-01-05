import React from "react";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, CartItem, updateQuantity, navigate } =
    useContext(ShopContext);
  const [CartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in CartItem) {
        for (const size in CartItem[items]) {
          if (CartItem[items][size] > 0) {
            tempData.push({
              _id: items,
              size: size,
              quantity: CartItem[items][size],
            });
          }
        }
      }
      // console.log(tempData);
      setCartData(tempData);
    }
  }, [CartItem, products]);

  return (
    <div className="py-15">
      <div>
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div className="py-7">
        {CartData.map((item, index) => {
          const ProductData = products.find(
            (product) => product._id === item._id
          );

          return (
            <div
              key={index}
              className="flex border-b border-t border-gray-300 py-4 items-center justify-between sm:gap-20"
            >
              <Link to={`/product/${item._id}`}>
                <div className="flex gap-2 sm:gap-5 items-center">
                  <div className="w-16 sm:w-20">
                    <img src={ProductData.image[0]} className="w-full" />
                  </div>
                  <div className="flex flex-col text-[12px] sm:text-[15px]">
                    <p className="">{ProductData.name}</p>
                    <div className="flex gap-5 items-center">
                      <div>
                        <p>
                          {currency}
                          {ProductData.price}
                        </p>
                      </div>
                      <div className="bg-gray-100 py-1 px-3 border-1 border-gray-200">
                        {item.size}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              <div>
                <input
                  onChange={(e) =>
                    e.target.value === "" || e.target.value === "0"
                      ? null
                      : updateQuantity(
                          item._id,
                          item.size,
                          Number(e.target.value)
                        )
                  }
                  type="Number"
                  className="w-12 sm:w-20 border-1 border-gray-300 px-2"
                  min={1}
                  defaultValue={item.quantity}
                />
              </div>

              <div className="mr-5 sm:mr-20">
                <img
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  src={assets.bin_icon}
                  className="cursor-pointer w-4 sm:w-5"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-end">
        <CartTotal />
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => navigate("/place-orders")}
          className="bg-black text-white py-3 px-8 text-[14px] sm:text-[15px] cursor-pointer"
        >
          PROCEED TO CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default Cart;
