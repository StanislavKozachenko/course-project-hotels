import React from 'react';
import { useDispatch } from 'react-redux';
import {addItem, clearItems, removeCartItem, removeItem} from '../Redux/slices/cartSlice';
import {Link} from "react-router-dom";

export default function CartItem(
    {
        // id,
        // title,
        // type,
        // size,
        // price,
        // count,
        // imageUrl
        id,
        hotel,
        room_number,
        type,
        count,
        price
    }
    ) {
  const dispatch = useDispatch();
  const onClickPlus = () => {
    // dispatch(
    //   addItem({
    //     id,
    //   }),
    // );
  };
  const onClickMinus = () => {
    dispatch(removeCartItem(id));
    console.log(count);
    if(count <= 1){
        dispatch(clearItems())
    }
  };
  const onClickRemove = () => {
    dispatch(removeItem(id));
  };
  return (
      <>
          {count > 0 ? <div className="cart__item">
              <div className="cart__item-img" style={{width: '150px'}}>
                  <Link to={`/hotel/${hotel.id}/rooms`} style={{width: '100%', display: 'block'}}>
                  <div className="book-block__image" style={{height: '150px'}}>
                      <div className="book-block__image_content" style={{backgroundImage: `url(${hotel.imageUrl})`, backgroundSize: "cover"}}></div>
                  </div>
                  </Link>
              </div>
              <div className="cart__item-info">
                  <h3>{hotel.name}</h3>
                  <p>
                      #<strong>{room_number}</strong>, {type === "1" ? "Одноместный" : type === "2" ? "Двухместный" : "Многоместный"}
                  </p>
              </div>
              <div className="cart__item-count">
                  <div
                      onClick={onClickMinus}
                      className="button button--outline button--circle cart__item-count-minus">
                      <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                              d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                              fill="#EB5A1E"></path>
                          <path
                              d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                              fill="#EB5A1E"></path>
                      </svg>
                  </div>
                  <b>{count}</b>
                  <div
                      onClick={onClickPlus}
                      className="button button--outline button--circle cart__item-count-plus cart__item_disabled">
                      <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                              d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                              fill="#EB5A1E"></path>
                          <path
                              d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                              fill="#EB5A1E"></path>
                      </svg>
                  </div>
              </div>
              <div className="cart__item-price">
                  <b>{(price * count).toFixed(2)} $</b>
              </div>
              <div className="cart__item-remove">
                  <div onClick={onClickRemove} className="button button--outline button--circle">
                      <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                              d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                              fill="#EB5A1E"></path>
                          <path
                              d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                              fill="#EB5A1E"></path>
                      </svg>
                  </div>
              </div>
          </div> : ""}
      </>

  );
}
