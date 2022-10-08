import React from "react";
import Home from "./routes/Home";
import Login from "./routes/Login"
import Checkout from './routes/Checkout';
import Payment from'./routes/Payment';
import Orders from './routes/Orders';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import{authservice} from './firebase';
import { useStateValue, useDispatchValue } from './StateProvider';
const promise = loadStripe("pk_test_51Lmt9qBvutsnmRE50XsnmtkVuRGOOZttoEXtLgVhkmLrvfcI0AA9bCKOSD4vTngl6aSMNLspGM8DevuWwkmGfGAH00NR4kP2k7");


function App() {
  const state=useStateValue();
  const dispatch = useDispatchValue();
//login user 적용이 안됨 server 에서 토큰을 넘겨주면?
  React.useEffect(()=>{
    authservice.onAuthStateChanged(authuser=>{
      console.log(authuser)
      if(authuser){
        dispatch({
          type:"SET_USER",user:authuser.email
        })
        
      }else{
        dispatch({
          type:"SET_USER",user:""
        })
      }
    })
  },[])



  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Elements stripe={promise}><Payment /></Elements>} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
