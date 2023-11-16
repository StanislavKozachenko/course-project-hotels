import React from 'react';
import './AddReview.module.scss'
const AddReview = ({onAddHandler}) => {
    return (
        <table className="show" cellSpacing="12">
            <tbody>
            <tr className="list">
                <th>Текст</th>
                <th>Рейтинг</th>
            </tr>
            <tr className="book">
                <td>
                            <textarea
                                className="input input-menu"
                                name="name"
                                placeholder="Отзыв..."
                                id='review_text'></textarea>
                </td>
                <td>
                    <input
                        className="input input-menu"
                        name="rating"
                        placeholder="Рейтинг..."
                        id='rating'></input>
                </td>
                <td>
                    <button type="submit" className="saveBtn" id={'save'} onClick={onAddHandler}>
                        Добавить
                    </button>
                </td>
            </tr>
            </tbody>
        </table>
    );
};

export default AddReview;