import React from 'react';
import { Link } from 'react-router-dom';
import imageUrl from '../images/img/empty-cart.png';

export default function CartEmpty() {
  return (
    <div className="content">
      <div className="container container--cart">
        <div className="cart cart--empty">
          <h2>
            Корзина пустая <icon>😕</icon>
          </h2>
          <p>
            Вероятней всего, вы не бронировали номер.
            <br />
            Для того, чтобы забронировать номер, перейди на главную страницу.
          </p>
          <img src={imageUrl} alt="Empty cart" />
          <Link to="/" class="button button--black">
            <span>Вернуться назад</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
