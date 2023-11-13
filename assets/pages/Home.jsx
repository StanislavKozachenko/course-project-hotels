import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Categories from '.././components/Categories';
import Sort from '.././components/Sort';
import HotelBlock from '../components/HotelBlock';
import { useEffect, useContext } from 'react';
import Skeleton from '../components/HotelBlock/Skeleton';
import Pagination from '.././components/Pagination';
import { sortList } from '../components/Sort';
import { SearchContext } from '../Main';
import {setCategory, setCurrentPage, setFilters} from '../Redux/slices/filterSlice';
import { useRef } from 'react';
import { fetchBooks } from '../Redux/slices/booksSlice';
import Map from '../components/Map/Map';
import {fetchHotels} from "../Redux/slices/hotelsSlice";

export default function Home() {
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const category = useSelector((state) => state.filter.category);
  const { books, booksStatus } = useSelector((state) => state.books);
  const { hotels, hotelsStatus } = useSelector((state) => state.hotels);
  const sortType = useSelector((state) => state.filter.sort);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const dispatch = useDispatch();

  const { searchValue } = useContext(SearchContext);

  const onClickCategory = (i) => {
    dispatch(setCategory(i));
  };
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };
  // const getBooks = async () => {
  //   const search = searchValue ? `&title=${searchValue}` : '';
  //   dispatch(fetchBooks({ currentPage, categoryId, sortType, search }));
  // };

  const getHotels = async () => {
    const search = searchValue ? `&name=${searchValue}` : '';
    dispatch(fetchHotels({ currentPage, category, sort: sortType.sort, search }));
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sort === params.sort);
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  // useEffect(() => {
  //   getBooks();
  // }, [categoryId, sortType.sort, searchValue, currentPage]);

  useEffect(() => {
    getHotels();
  }, [category, sortType.sort, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify(
        {
          sort: sortType.sort,
          category,
          currentPage,
        },
        { addQueryPrefix: true },
      );
      navigate(`${queryString}`);
    }
    isMounted.current = true;
  }, [category, sortType.sort, searchValue, currentPage]);
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={category} onClickCategory={(i) => onClickCategory(i)} />
        <Sort />
      </div>
      <h2 className="content__title">Все отели</h2>
      {hotelsStatus === 'error' ? (
        <div className="loading-error">
          <h2>
            Произошла ошибка <icon>😕</icon>
          </h2>
          <p>
            Отели не найдены
            <br />
            Для того, чтобы забронировать номер, перейдите на главную страницу.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {hotelsStatus === 'loading'
            ? [...new Array(4)].map((_, index) => <Skeleton key={index} />)
            : hotels.map((obj) => <HotelBlock key={obj.id} {...obj} />)}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      <Map />
    </div>
  );
}
