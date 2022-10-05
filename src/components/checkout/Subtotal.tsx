import React from "react";
import './Subtotal.css';
import { getTotalprice,useStateValue } from '../../StateProvider';
import { useNavigate } from "react-router-dom";
function Subtotal() {
  const state=useStateValue();
  const value =getTotalprice(state.basket)
  const navigate=useNavigate();

  return (
    <div className="Subtotal">
      <p>
        Total({state.basket.length}:itmes) : <strong>{value}원</strong>
      </p>
      <small className="subtotal_gift">
        <input type="checkbox" name="" id="" />This order contain gift
      </small>
      <button onClick={e=>navigate('/payment')}>Proceed to checkout</button>
      
    </div>
    
  );
}

export default Subtotal;
