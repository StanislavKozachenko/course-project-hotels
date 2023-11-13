import React from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import './Pagination.module.scss';
export default function Pagination({ currentPage, onChangePage }) {
  const { hotels, hotelsStatus } = useSelector((state) => state.hotels);
  return (
      <>
        {hotelsStatus === 'success' ?  <ReactPaginate
            className="root"
            breakLabel="..."
            forcePage={currentPage - 1}
            nextLabel=">"
            previousLabel="<"
            onPageChange={(event) => onChangePage(event.selected + 1)}
            pageRangeDisplayed={8}
            pageCount={Math.ceil(hotels.length / 4)}
            renderOnZeroPageCount={null}
        /> : ''}
      </>

  );
}
