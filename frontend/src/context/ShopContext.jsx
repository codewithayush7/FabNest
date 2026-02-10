import { createContext } from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [Search, setSearch] = useState(" ");
  const [ShowSearch, setShowSearch] = useState(false);
  const [CartItem, setCartItem] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  console.log("Backend URL:", backendUrl);

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }

    let cartData = structuredClone(CartItem);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItem(cartData);

    if (token) {
      try {
        console.log("Token being sent:", token);
        let response = await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        console.log(response.data);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    //   console.log(CartItem);
  }, [CartItem]);

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in CartItem) {
      for (const size in CartItem[items]) {
        try {
          if (CartItem[items][size] > 0) {
            totalCount += CartItem[items][size];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(CartItem);

    cartData[itemId][size] = quantity;

    setCartItem(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { Authorization: `Bearer ${token}` } },
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in CartItem) {
      let itemInfo = products.find((product) => product._id === items);
      for (const size in CartItem[items]) {
        try {
          if (CartItem[items][size] > 0) {
            totalAmount += itemInfo.price * CartItem[items][size];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      console.log("Products from backend:", response.data.products);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error while fetching products:", error);
      toast.error(error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (response.data.success) {
        setCartItem(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    Search,
    setSearch,
    ShowSearch,
    setShowSearch,
    addToCart,
    CartItem,
    setCartItem,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
