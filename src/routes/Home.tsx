import React, { useEffect } from "react";
import "./Home.css";
import Header from "../components/Header";
import Product from "./Product";
import axios from "../axios";
import { useDispatchValue, useStateValue } from "../StateProvider";

function Home() {
  const dispatch = useDispatchValue();
  const state = useStateValue();

  /**
   * 상품 데이터 서버에 요청 후  product state 에 저장
   */
  useEffect(() => {
    axios.get("/").then(async (res) => {
      if (res.data) {
        dispatch({
          type: "SET_PRODUCT",
          pr: res.data,
        });
      } else {
        console.log("get data error");
      }
    });
  }, []);

  return (
    <>
      <Header />
      <div className="Home">
        <div className="home_container">
          <img src="homeimage.jpg" alt="homeimage" className="home_image" />
          {state.product.map((item, index) => {
            return (
              <div className="home_row" key={index}>
                <Product
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  image={item.image}
                  rating={item.rating}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
