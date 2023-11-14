import React, { useContext } from 'react';
import './ShowHotelItem.module.scss';
import { AdminContext } from '../../../pages/Admin';
import {Link} from "react-router-dom";

export default function ShowHotelItem({
  id,
  name,
  description,
  address,
  imageUrl,
  category,
  rating,
  room_count
}) {
  // const { authors, publishers } = useContext(AdminContext);
  //
  // const bookTypes = ['твёрдый', 'мягкий'];
  // const categoryTypes = [
  //   'все',
  //   'психология',
  //   'бестеллеры',
  //   'биография',
  //   'бизнес',
  //   'художественная',
  // ];

  return (
    <>
      <tr className="hotel">
        <td>
          <input className="input input-menu" name="value" value={id}></input>
        </td>
        <td>
          <Link to={`/hotel/${id}/rooms`}>
            <input className="input input-menu input-hotel-check" name="value" value={name}/>
          </Link>
        </td>
        <td>
          <input className="input input-menu" name="value" value={address}></input>
        </td>
        <td>
          <input className="input input-menu" name="value" value={category}></input>
        </td>
        <td>
          <input className="input input-menu" name="value" value={imageUrl}></input>
        </td>
        {/*<td>*/}
        {/*  <input*/}
        {/*      className="input"*/}
        {/*    name="value"*/}
        {/*    value={sizes.map((size, index) => size)}></input>*/}
        {/*</td>*/}
        <td>
          <input className="input input-menu" name="value" value={rating}></input>
        </td>
        {/*<td>*/}
        {/*  <input*/}
        {/*      className="input"*/}
        {/*    name="value"*/}
        {/*    value={types.map((type, index) => bookTypes[type])}></input>*/}
        {/*</td>*/}
        <td>
          <input className="input input-menu" name="value" value={room_count}></input>
        </td>
        <td>
          <input className="input input-menu" name="value" value={description !== '' ? description : 'Нет описания'}></input>
        </td>
      </tr>
    </>
  );
}
