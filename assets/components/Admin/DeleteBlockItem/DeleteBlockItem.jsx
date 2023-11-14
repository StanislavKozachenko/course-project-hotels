import React from 'react';
import './DeleteBlockItem.module.scss';
import axios from 'axios';
export default function DeleteBlockItem({
                                          id,
                                          name,
                                          description,
                                          address,
                                          imageUrl,
                                          category,
                                          rating,
                                          room_count
}) {
  function onDeleteHandler() {
    if (document.getElementById('checkbox-' + id).checked) {
      axios.delete(`http://localhost:8000/api/hotel/${id}`).then((data) => {console.log(data);alert("Успешно!")});
    } else {
      alert('Необходимо выбрать элемент!');
    }
  }
  const categoryTypes = {
    'Asia': 'Азия',
    'Europe': 'Европа',
    'America': 'Америка',
    'Australia': 'Австралия'
  };

  return (
    <>
      <tr className="book delete-book">
        <td>
          <input
            className="input input-menu"
            type="checkbox"
            name="value"
            id={'checkbox-' + id}></input>
        </td>
        <td>
          <input className="input input-menu" name="value" value={id}></input>
        </td>
        <td>
          <input className="input input-menu" name="value" value={name}></input>
        </td>
        <td>
          <input className="input input-menu" name="value" value={address}></input>
        </td>
        <td>
          <input className="input input-menu" name="value" value={categoryTypes[category]}></input>
        </td>
        <td>
          <input className="input input-menu" name="value" value={imageUrl}></input>
        </td>
         <td>
          <input className="input" name="value" value={rating}></input>
        </td>
        <td>
          <input className="input" name="value" value={rating}></input>
        </td>
        <td>
          <button
            type="submit"
            className="saveBtn"
            id={'save-' + id}
            onClick={onDeleteHandler}>
            Удалить
          </button>
        </td>
      </tr>
    </>
  );
}
