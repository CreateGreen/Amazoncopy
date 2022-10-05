
import "./Orderlist.css";
import moment from "moment";
import CheckoutProduct from "../checkout/CheckoutProduct";



function Orderlist({ order }: any) {
  console.log(order)
  return (
    <>
      <div className="orderlist">
        <p>{moment.unix(order.data?.create).format()}</p>

        <p className="order_id">
          <small>{order.id}</small>
        </p>
        <h3 className="order_total">Order Price {order.data?.amount}</h3>
        {order.data?.basket.map((item:any)=>{
          return(
          <CheckoutProduct
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
        />
          )
        })}
        


      </div>
    </>
  );
}

export default Orderlist;
