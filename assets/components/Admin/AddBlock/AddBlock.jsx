import React, {useState} from 'react';
import './AddBlock.module.scss';
import axios from 'axios';

export default function AddBlock() {
    const [isCorrect, setIsCorrect] = useState(true);
    const categoryTypes = {
        'Asia': 'Азия',
        'Europe': 'Европа',
        'America': 'Америка',
        'Australia': 'Австралия'
    };

    function getValue(name) {
        let result = false;
        if (document.getElementById(name).value) {
            result = document.getElementById(name).value;
        } else {
            name === 'description' ? result = '' : alert('Данные неверны.');
            setIsCorrect(false);
        }
        return result;
    }

    function onAddHandler(event) {
        if (isCorrect) {
            event.preventDefault();
            const formDataReq = new FormData();
            const fields = ['category', 'name', 'description', 'address', 'imageUrl', 'rating'];

            fields.forEach(field => {
                const value = getValue(field);
                if (value) {
                    formDataReq.append(field, value);
                }
            });
            axios
                .post(`http://localhost:8000/api/hotel`, formDataReq)
                .then((data) => {
                    console.log(data);
                    alert("Успешно!")
                });
        }
    }

    return (
        <>
            <div className="main">
                <table className="show" cellSpacing="12">
                    <tbody>
                    <tr className="list">
                        <th>Название</th>
                        <th>Адрес</th>
                        <th>Категория</th>
                        <th>URL картинки</th>
                        <th>Рейтинг</th>
                        <th>Описание</th>
                    </tr>
                    <tr className="book">
                        <td>
                            <input
                                className="input input-menu"
                                name="name"
                                placeholder="Название..."
                                id={'name'}></input>
                        </td>
                        <td>
                            <input
                                className="input input-menu"
                                name="address"
                                placeholder="Адрес..."
                                id={'address'}></input>
                        </td>
                        <td>
                            <select className="input input-menu" name="category" id="category">
                                {Object.entries(categoryTypes).map(([key, value]) => (
                                    <option key={key} value={key}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </td>
                        <td>
                            <input
                                className="input input-menu"
                                name="imageUrl"
                                placeholder="Путь к картинке..."
                                id={'imageUrl'}></input>
                        </td>
                        <td>
                            <input
                                type="number"
                                min={1}
                                max={10}
                                id={'rating'}
                                className="input input-menu"
                                name="rating"
                                placeholder="Рейтинг..."></input>
                        </td>
                        <td>
                            <input
                                className="input input-menu"
                                name="description"
                                placeholder="Описание..."
                                id={'description'}></input>
                        </td>
                        <td>
                            <button type="submit" className="saveBtn" id={'save'} onClick={onAddHandler}>
                                Добавить
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}
