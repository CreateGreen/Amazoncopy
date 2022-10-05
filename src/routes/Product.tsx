import React from "react";
import './Product.css';
import { useDispatchValue,useStateValue } from '../StateProvider';

interface PropsType{
  id:string,
  title:string,
  image:any,
  price:any,
  rating:number,

}



function Product({id, title,image,price,rating}:PropsType) {
  const state=useStateValue();
  const dispatch = useDispatchValue();
  const Addtobasket =()=>{
    dispatch({
      type:'ADD_TO_BASKET',item:{
        id:id,
        title:title,
        image:image,
        price:price,
        rating:rating,
      }

    })
    
  }
  const ar = Array(rating).fill(undefined)
  return (
    <div className="Product">
      <div className="product_info">
        <p>{title}</p>
        <p className="product_price">
          <strong>{price}</strong>
          <small>원</small>
        </p>

        <div className="product_rating">
          {
            ar.map(()=>{
              return(
              <p key={id}>★</p>)
            })
          }
        </div>
      </div>
      <img src={image} alt="" />
      <button onClick={Addtobasket}>장바구니</button>
    </div>
  );
}

export default Product;
