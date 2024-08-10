// import React, { useEffect, useState } from "react";
// import Layout from "../components/Layout/Layout";
// import { useCart } from "../context/cart";
// import { useAuth } from "../context/auth";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import DropIn from "braintree-web-drop-in-react";
// import toast from "react-hot-toast";
// import styles from '../styles/Cart.module.css';

// const CartPage = () => {
//   const [cart, setCart] = useCart();
//   const [auth, setAuth] = useAuth();
//   const navigate = useNavigate();
//   const [clientToken, setClientToken] = useState();
//   const [instance, setInstance] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 3;

//   const totalPrice = () => {
//     try {
//       let total = 0;
//       cart?.forEach((item) => {
//         total += item.price * (item.quantity || 1);
//       });
//       return total.toLocaleString("en-US", {
//         style: "currency",
//         currency: "USD",
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const removeCartItem = (pid) => {
//     try {
//       let myCart = [...cart];
//       let index = myCart.findIndex((item) => item._id === pid);
//       if (index !== -1) {
//         myCart.splice(index, 1);
//         localStorage.setItem("cart", JSON.stringify(myCart));
//         setCart(myCart);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const incrementQuantity = (pid) => {
//     try {
//       let myCart = [...cart];
//       let index = myCart.findIndex((item) => item._id === pid);
//       if (index !== -1) {
//         myCart[index].quantity = (myCart[index].quantity || 1) + 1;
//         localStorage.setItem("cart", JSON.stringify(myCart));
//         setCart(myCart);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const decrementQuantity = (pid) => {
//     try {
//       let myCart = [...cart];
//       let index = myCart.findIndex((item) => item._id === pid);
//       if (index !== -1 && myCart[index].quantity > 1) {
//         myCart[index].quantity -= 1;
//         localStorage.setItem("cart", JSON.stringify(myCart));
//         setCart(myCart);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getToken = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/product/braintree/token");
//       setClientToken(data?.clientToken);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getToken();
//   }, [auth?.token]);

//   const handlePayment = async () => {
//     try {
//       setLoading(true);
//       const { nonce } = await instance.requestPaymentMethod();
//       const { data } = await axios.post(
//         "/api/v1/product/braintree/payment",
//         {
//           nonce,
//           cart,
//         },
//         {
//           headers: {
//             Authorization: auth?.token,
//           },
//         }
//       );
//       setLoading(false);
//       localStorage.removeItem("cart");
//       setCart([]);
//       navigate("/dashboard/user/orders");
//       toast.success("Payment Completed Successfully");
//     } catch (error) {
//       setLoading(false);
//       toast.error("Payment Failed");
//     }
//   };

//   const paginatedItems = () => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     return cart.slice(startIndex, endIndex);
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const totalPages = Math.ceil(cart.length / itemsPerPage);

//   const paginationNumbers = () => {
//     let start = Math.max(1, currentPage - 2);
//     let end = Math.min(totalPages, currentPage + 2);
//     let pages = [];

//     for (let i = start; i <= end; i++) {
//       pages.push(i);
//     }

//     return pages;
//   };

//   return (
//     <Layout>
//       <div className={styles.container}>
//         <div className={styles.header}>
//           <h1>{`Hello ${auth.token && auth?.user?.name}`}</h1>
//           <h4>
//             {cart?.length
//               ? `You have ${cart.length} items in your cart ${
//                   auth?.token ? "" : "Please Login to checkout"
//                 }`
//               : `Your Cart is Empty`}
//           </h4>
//         </div>
//         <div className={styles.cart}>
//           <div className={styles.cartItems}>
//             {paginatedItems().map((p) => (
//               <div key={p._id} className={styles.cartItem}>
//                 <div className={styles.imageContainer}>
//                   <img
//                     src={`/api/v1/product/product-photo/${p._id}`}
//                     className={styles.itemImage}
//                     alt={p.name}
//                   />
//                 </div>
//                 <div className={styles.itemDetails}>
//                   <h4>{p.name}</h4>
//                   <p>{p.description.substring(0, 30)}</p>
//                   <p>Price:&#8377;{p.price}</p>
//                   <div className={styles.quantityControl}>
//                     <button onClick={() => decrementQuantity(p._id)}>-</button>
//                     <span>{p.quantity || 1}</span>
//                     <button onClick={() => incrementQuantity(p._id)}>+</button>
//                   </div>
//                   <button
//                     className={styles.removeButton}
//                     onClick={() => removeCartItem(p._id)}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//             <div className={styles.pagination}>
//               <button
//                 onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//               >
//                 Previous
//               </button>
//               {paginationNumbers().map((page) => (
//                 <button
//                   key={page}
//                   className={currentPage === page ? styles.activePage : ""}
//                   onClick={() => handlePageChange(page)}
//                 >
//                   {page}
//                 </button>
//               ))}
//               <button
//                 onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                 disabled={currentPage === totalPages}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//           <div className={styles.summary}>
//             <h4>Cart Summary</h4>
//             <p>Total | Checkout | Payment</p>
//             <hr />
//             <h4>Total: {totalPrice()}</h4>
//             {auth?.user?.address ? (
//               <div className={styles.address}>
//                 <h4>Current Address</h4>
//                 <h5>{auth?.user?.address}</h5>
//                 <button
//                   className={styles.updateAddressButton}
//                   onClick={() => navigate("/dashboard/user/profile")}
//                 >
//                   Update Address
//                 </button>
//               </div>
//             ) : (
//               <div className={styles.address}>
//                 {auth?.token ? (
//                   <button
//                     onClick={() => navigate("/dashboard/user/profile")}
//                     className={styles.updateAddressButton}
//                   >
//                     Update Address
//                   </button>
//                 ) : (
//                   <button
//                     onClick={() => navigate("/login", { state: "/cart" })}
//                     className={styles.updateAddressButton}
//                   >
//                     Please Login to checkout
//                   </button>
//                 )}
//               </div>
//             )}
//             <div className={styles.payment}>
//               {!clientToken || !cart?.length ? (
//                 ""
//               ) : (
//                 <>
//                   <DropIn
//                     options={{
//                       authorization: clientToken,
//                       paypal: {
//                         flow: "vault",
//                       },
//                     }}
//                     onInstance={(instance) => setInstance(instance)}
//                   />
//                   <button
//                     className={styles.paymentButton}
//                     onClick={handlePayment}
//                     disabled={loading || !auth?.user?.address || !instance}
//                   >
//                     {loading ? "Processing..." : "Make Payment"}
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default CartPage;









import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import toast from "react-hot-toast";
import styles from '../styles/Cart.module.css';

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState();
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Aggregate duplicate items
  const aggregateCartItems = () => {
    const aggregated = {};
    cart.forEach(item => {
      if (aggregated[item._id]) {
        aggregated[item._id].quantity += item.quantity || 1;
      } else {
        aggregated[item._id] = { ...item, quantity: item.quantity || 1 };
      }
    });
    return Object.values(aggregated);
  };

  const totalPrice = () => {
    try {
      let total = 0;
      aggregateCartItems().forEach((item) => {
        total += item.price * item.quantity;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItem = (pid) => {
    try {
      const updatedCart = cart.filter(item => item._id !== pid);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
    } catch (error) {
      console.log(error);
    }
  };

  const increaseQuantity = (productId) => {
    const cartItems = [...cart]; // Assuming cart is the array of items in your CartPage state
    
    // Find the index of the item in the cart
    const itemIndex = cartItems.findIndex((item) => item._id === productId);
  
    if (itemIndex === -1) {
      return; // If the item is not found in the cart, do nothing
    }
  
    const item = cartItems[itemIndex];
  
    // Check if the item's quantity is less than the stock limit
    if (item.quantity) {
      item.quantity += 1; // Increment the quantity by 1
  
      // Update the cart state with the modified item
      setCart([...cartItems]);
  
      // Optionally update localStorage if you're storing the cart there
      localStorage.setItem("cart", JSON.stringify(cartItems));
  
      toast.success("Item quantity increased by 1");
    } else {
      toast.error("Item cannot be added more");
    }
  };
  
  const decreaseQuantity = (pid) => {
    const updatedCart = cart.map(item => {
      if (item && item._id === pid) {
        if (item.quantity > 1) { // Ensure quantity doesn't go below 1
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return { ...item, quantity: 1 }; // Set to 1 if less than 1
        }
      }
      return item;
    }).filter(item => item !== null);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };
  

  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        "/api/v1/product/braintree/payment",
        {
          nonce,
          cart,
        },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      setLoading(false);
      toast.error("Payment Failed");
    }
  };

  const paginatedItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return aggregateCartItems().slice(startIndex, startIndex + itemsPerPage);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(aggregateCartItems().length / itemsPerPage);

  const paginationNumbers = () => {
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>{`Hello ${auth.token && auth?.user?.name}`}</h1>
          <h4>
            {cart?.length
              ? `You have ${cart.length} items in your cart ${
                  auth?.token ? "" : "Please Login to checkout"
                }`
              : `Your Cart is Empty`}
          </h4>
        </div>
        <div className={styles.cart}>
          <div className={styles.cartItems}>
            {paginatedItems().map((item) => (
              <div key={item._id} className={styles.cartItem}>
                <div className={styles.imageContainer}>
                  <img
                    src={`/api/v1/product/product-photo/${item._id}`}
                    className={styles.itemImage}
                    alt={item.name}
                  />
                </div>
                <div className={styles.itemDetails}>
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <div className={styles.quantityControl}>
                    <button onClick={() => decreaseQuantity(item._id)}>-</button>
                    <span>{item.quantity || 1}</span>
                    <button onClick={() => increaseQuantity(item._id)}>+</button>
                  </div>
                  <button
                    className={styles.removeButton}
                    onClick={() => removeCartItem(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className={styles.pagination}>
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {paginationNumbers().map((page) => (
                <button
                  key={page}
                  className={currentPage === page ? styles.activePage : ""}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
          <div className={styles.summary}>
            <h4>Cart Summary</h4>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total: {totalPrice()}</h4>
            {auth?.user?.address ? (
              <div className={styles.address}>
                <h4>Current Address</h4>
                <h5>{auth?.user?.address}</h5>
                <button
                  className={styles.updateAddressButton}
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </button>
              </div>
            ) : (
              <div className={styles.address}>
                {auth?.token ? (
                  <button
                    onClick={() => navigate("/dashboard/user/profile")}
                    className={styles.updateAddressButton}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/login", { state: "/cart" })}
                    className={styles.updateAddressButton}
                  >
                    Please Login to checkout
                  </button>
                )}
              </div>
            )}
            <div className={styles.payment}>
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className={styles.paymentButton}
                    onClick={handlePayment}
                    disabled={loading || !auth?.user?.address || !instance}
                  >
                    {loading ? "Processing..." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
