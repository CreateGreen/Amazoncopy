import React from "react";
import "./Home.css";
import Header from "../components/Header"
import Product from "./Product";
function Home() {
  return (
    <>
    <Header />
    <div className="Home">
      <div className="home_container">
        <img src="homeimage.jpg" alt="" className="home_image" />
        <div className="home_row">
          <Product id='1' title="제품" price={10000} image="productimage.jpg" rating = {2} />
        </div>
        <div className="home_row">
          <Product id='1' title="제품" price="10,000" image="productimage.jpg" rating={1}/>
          <Product id='1' title="제품" price="10,000" image="productimage.jpg" rating={1}/>
        </div>
        <div className="home_row">
          <Product id='1' title="제품" price="10,000" image="productimage.jpg" rating={1}/>
        </div>
      </div>
    </div>
    </>
  );
}

export default Home;
