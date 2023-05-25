import React from "react";

import qs from "qs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Categories } from "../components/Categories/Categories";
import { Sort } from "../components/Sort/Sort";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";
import { PizzaBlockSkeleton } from "../components/PizzaBlock/PizzaBlockSkeleton.jsx";
import { Pagination } from "../components/Pagination/Pagination";
import { useSelector } from "react-redux";
import { setCurrentPage, setFilters } from "../redux/slice/filterSlice";
import { listSort } from "../components/Sort/Sort";
import { fetchPizza } from "../redux/slice/pizzaSlice";

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sortType, searchValue, currentPage } = useSelector((state) => state.filter);
  const { items, status } = useSelector((state) => state.pizza);

  React.useEffect(() => {
    if (window.location.search && !isMounted) {
      const params = qs.parse(window.location.search.substring(1));
      const sortProperty = listSort.find((item) => item.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sortProperty,
        })
      );
    }
    isSearch.current = true;
  }, []);

  const getPizzaz = async () => {
    const category = categoryId > 0 ? `category=${categoryId}&` : "";
    const search = searchValue ? `search=${searchValue}&` : "";
    const sortBy = sortType.sortProperty.replace("-", "");
    const order = sortType.sortProperty.startsWith("-") ? "desc" : "asc";

    dispatch(
      fetchPizza({
        category,
        search,
        sortBy,
        order,
        currentPage,
      })
    );
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (isSearch.current) {
      getPizzaz();
    }

    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        currentPage,
      });
      navigate("?" + queryString);
    }
    isMounted.current = true;
    isSearch.current = true;
  }, [categoryId, sortType, searchValue, currentPage]);

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const pizzas = items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);

  const skeletons = [...new Array(6)].map((_, index) => <PizzaBlockSkeleton key={index} />);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error">Произошла ошибка при загрузке данных</div>
      ) : (
        <div className="content__items">{status === "loading" ? skeletons : pizzas}</div>
      )}

      <Pagination onChangePage={(number) => onChangePage(number)} />
    </>
  );
};
