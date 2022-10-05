import React from "react";
import "./Checkout.css";
import Subtotal from "../components/checkout/Subtotal";
import Header from "../components/Header";
import CheckoutProduct from "../components/checkout/CheckoutProduct";
import { useStateValue } from "../StateProvider";
function Checkout() {
  const state = useStateValue();
  return (
    <>
    <Header />
    <div className="Checkout">
      <div className="checkout_left">
        <img src="checkoutad.gif" alt="" className="checkout_ad" />
        <div>
          <h2 className="checkout_title">{state.user}Shopping Cart</h2>
          {state.basket.map((item): JSX.Element => {
            return (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            );
          })}
        </div>
      </div>
      <div className="checkout_right">
        <Subtotal />
      </div>
    </div>
    </>
  );
}

export default Checkout;
