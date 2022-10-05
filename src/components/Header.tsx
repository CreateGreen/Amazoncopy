import React, { useEffect } from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasket from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { authservice } from "../firebase";

function Header() {
  const state = useStateValue();
  
  const handleAuth =()=>{
    if(state.user){
      authservice.signOut();
    }

  }
  return (
    <div className="header">
      <Link to="/">
        <img className="header_logo" src="header-.png" />
      </Link>
      <div className="header_search">
        <input type="text" className="header_search_input" />
        <SearchIcon className="header_searchicon" />
      </div>

      <div className="header_nav">
        <div className="header_option">
          <span className="header_optionone">{!state.user ? "Guest":state.user}</span>
          <Link to={!state.user ? '/login':'/'} className="header_login">
            <span onClick={handleAuth} className="header_optiontwo">{state.user ? "로그아웃":"로그인"}</span>
          </Link>
        </div>

        <div className="header_option">
          <span className="header_optionone">안녕하세요!</span>
          <span className="header_optiontwo">주문내역!</span>
        </div>

        <div className="header_option">
          <span className="header_optionone">안녕하세요!</span>
          <Link to="/payment" className="header_payment">
          <span className="header_optiontwo">결제하기!</span>
          </Link>
        </div>
        <div className="header_optionbasket">
          <Link to="/checkout" className="header_basket">
            <ShoppingBasket />
          </Link>
          <span className="header_optionline">{state.basket.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
