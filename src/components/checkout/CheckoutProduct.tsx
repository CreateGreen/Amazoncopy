import "./CheckoutProduct.css";
import { useDispatchValue} from '../../StateProvider';

function CheckoutProduct({ id, title, image, price, rating }: any) {
  const dispatch=useDispatchValue();
  const Deletefrombasket =()=>{
    
    dispatch({
      type:'REMOVE_FROM_BASKET', id:id,
    })
    
  }
  const ar = Array(rating).fill(undefined);
  return (
    <div className="checkoutProduct">
      <img src={image} alt="" className="checkoutproduct_image" />
      <div className="checkoutproduct_info">
        <p>{title}</p>
        <p className="checkoutproduct_price">
          <strong>{price}</strong>
          <small>원</small>
        </p>

        <div className="checkoutproduct_rating">
          {ar.map(() => {
            return <p>★</p>;
          })}
        </div>
         <button onClick={Deletefrombasket}>delete</button>
      </div>
     
    </div>
  );
}
export default CheckoutProduct;
