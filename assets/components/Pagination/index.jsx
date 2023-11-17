import React, {useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import {useDispatch, useSelector} from 'react-redux';
import './Pagination.module.scss';
import {fetchAllHotels} from "../../Redux/slices/hotelsSlice";

export default function Pagination({currentPage, onChangePage}) {
    const {hotels, hotelsStatus} = useSelector((state) => state.hotels);
    return (
        <>
            {hotelsStatus === 'loading' ? '' : <ReactPaginate
                className="root paginate-root"
                breakLabel="..."
                forcePage={currentPage - 1}
                nextLabel=">"
                previousLabel="<"
                onPageChange={(event) => onChangePage(event.selected + 1)}
                pageRangeDisplayed={8}
                pageCount={4}
                renderOnZeroPageCount={null}
            />}
        </>

    );
}
