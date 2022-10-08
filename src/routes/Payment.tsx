import React, { useState } from "react";
import "./Payment.css";
import Header from "../components/Header";
import CheckoutProduct from "../components/checkout/CheckoutProduct";
import {
  useStateValue,
  useDispatchValue,
  getTotalprice,
} from "../StateProvider";
import { Link, useNavigate } from "react-router-dom";
import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "../axios";
import { db } from "../firebase";

function Payment() {
  const state = useStateValue();
  const dispatch = useDispatchValue();
  const value = getTotalprice(state.basket);
  const navigate =useNavigate();
  const [clientsecret, setclientsecret] = useState("");
  const [error, seterror] = useState(null);
  const [disable, setdisable] = useState(true);
  const [process, setprocess] = useState(false);
  const [success,setsuccess] =useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const handlechange = (event: any) => {
    setdisable(event.empty);
    seterror(event.error ? event.error.message : "");
  };
  /**
   * 
   * @param event 
   */
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setprocess(true)
    const payload = await stripe.confirmCardPayment(clientsecret,{
      payment_method:{
        card: elements?.getElement(CardElement)
      }

    }).then((result)=> {
      console.log(result)
      db
      .collection('users')
      .doc(state.user)
      .collection('orders')
      .doc(result.paymentIntent.id)
      .set({
        basket:state.basket,
        amount: result.paymentIntent.amount,
        create:result.paymentIntent.created,
      })

    //reset payment state 
    setsuccess(true);
    seterror(null);
    setprocess(false);
    dispatch({
      type: "CLEAN_BASKET"
    })


    navigate("/orders");
    })

  }; 
  
/**
 * 
 */
  React.useEffect(() => {
    const getClient = async () => {
      const response = await axios.post(`/payments/create?total=${value}`);
      setclientsecret(response.data.clientSecret);
      
    };
    getClient();
  }, [state.basket]);


  return (
    <>
      <Header />
      <div className="payment">
        <div className="payment_container">
          <Link to="/checkout">
            <h1>Back to the checkout page</h1>
          </Link>
          <h1>(*current basket item: {state.basket?.length})</h1>
          <div className="payment_section">
            <div className="payment_title">
              <h3>Shipping address</h3>
            </div>
            <div className="payment_address">
              <p>{state.user}: address</p>
              <p>Seoul</p>
            </div>
          </div>
          <div className="payment_section">
            <div className="payment_title">
              <h3>Item List</h3>
            </div>
            <div className="payment_items">
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
        </div>

        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment</h3>
          </div>
          <div className="payment_detail">
      
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handlechange} />
              <div className="payment_pricecontainer">
                {value}원
                <button disabled={process || disable || success}>
                  <span>{process ? <p>processing payment</p>:"pay"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
