import React, {useContext} from 'react';
import './EditBlockItem.module.scss';
import {AdminContext} from '../../../pages/Admin';
import axios from 'axios';

export default function EditBlockItem({
                                          id,
                                          name,
                                          description,
                                          address,
                                          imageUrl,
                                          category,
                                          rating,
                                          room_count
                                      }) {
    function getCategoryId(info) {
        let result;
        let i = 0;
        categoryTypes.forEach((el) => {
            if (info === el) {
                result = i;
            }
            i++;
        });
        return result;
    }

    const categoryTypes = {
        'Asia': 'Азия',
        'Europe': 'Европа',
        'America': 'Америка',
        'Australia': 'Австралия'
    };

    function getValue(name) {
        let result;
        if (document.getElementById(name + '-' + id).value) {
            result = document.getElementById(name + '-' + id).value;
        } else {
            result = false;
        }
        return result;
    }

    function onSaveHandler(event) {
        event.preventDefault();
        const id = event.target.id.split('-')[1];

        const formDataReq = {};
        const fields = ['category', 'name', 'description', 'address', 'imageUrl', 'rating'];

        fields.forEach(field => {
            const value = getValue(field);
            if (value) {
                category = value;
                formDataReq[field] = value;
            }
        });
        console.log(formDataReq);
        axios
            .put(`http://localhost:8000/api/hotel/${id}`, formDataReq)
            .then((data) => {
                console.log(data);
                alert("Успешно!")
            });
    }

    return (
        <>
            <tr className="book book-edit">
                <td>
                    <input className="input input-menu" name="id" value={id}></input>
                </td>
                <td>
                    <input
                        className="input input-menu"
                        name="name"
                        placeholder={name}
                        id={'name-' + id}></input>
                </td>
                <td>
                    <input
                        className="input input-menu"
                        name="address"
                        placeholder={address}
                        id={'address-' + id}></input>
                </td>
                <td>
                    <select className="input input-menu" name="category" id={'category-' + id}>
                        {Object.entries(categoryTypes).map(([key, value]) => (
                            <option key={key} value={key} selected={key === category}>
                                {value}
                            </option>
                        ))}
                    </select>
                </td>
                <td>
                    <input
                        className="input input-menu"
                        name="imageUrl"
                        placeholder={imageUrl}
                        id={'imageUrl-' + id}></input>
                </td>
                <td>
                    <input
                        className="input input-menu"
                        name="rating"
                        placeholder={rating}
                        id={'rating-' + id}></input>
                </td>
                <td>
                    <input
                        className="input input-menu"
                        name="room_count"
                        value={room_count}
                        id={'room_count-' + id}></input>
                </td>
                <td>
                    <input id={'description-' + id}
                           className="input input-menu"
                           name="description"
                           placeholder={description !== '' ? description : 'Нет описания'}></input>
                </td>
                {/*<td>*/}
                {/*    <select className="input" name="publisher" id={'publisher-' + id}>*/}
                {/*        <option>*/}
                {/*            {publishers[publisherId - 1].name + ' ' + publishers[publisherId - 1].country}*/}
                {/*        </option>*/}
                {/*        {publishers.map((obj) =>*/}
                {/*            obj.id !== publisherId ? (*/}
                {/*                <option key={obj.id}>{obj.name + ' ' + obj.country}</option>*/}
                {/*            ) : (*/}
                {/*                ''*/}
                {/*            ),*/}
                {/*        )}*/}
                {/*    </select>*/}
                {/*</td>*/}
                <td>
                    <button
                        type="submit"
                        className="saveBtn"
                        id={'save-' + id}
                        onClick={onSaveHandler}>
                        Сохранить
                    </button>
                </td>
            </tr>
        </>
    );
}
