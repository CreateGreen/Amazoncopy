import "./Orders.css";
import Orderlist from '../components/orders/Orderlist';

import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useStateValue } from "../StateProvider";

function Orders() {
  const state = useStateValue();
  const [orders,setorders]=useState([{id:"",data:null}]);

  useEffect(()=>{
    
    if(state.user){
      console.log("get data from firebase")
      db
      .collection('users')
      .doc(state.user)
      .collection('orders')
      .orderBy('create','desc')
      .onSnapshot(shot=>{
        
        shot.docs.map((doc)=>{
          setorders([{id:doc.id,data:doc.data()}])
        })
      })
      
    }else{
      setorders([{id:"",data:null}]);
    }

  },[state.user])
  
  return ( 
    <>
      <div className="orders">
        <h1>Order List</h1>
        <div className="orders_roder">
          {orders.map(order=><Orderlist order={order} key={order.id}/>)}
        </div>

        
      </div>
    </>
  );
}

export default Orders;
