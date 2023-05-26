import React from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import { Categories } from "../components/Categories/Categories";
import { Sort } from "../components/Sort/Sort";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";
import { PizzaBlockSkeleton } from "../components/PizzaBlock/PizzaBlockSkeleton";
import { Pagination } from "../components/Pagination/Pagination";
import { useSelector } from "react-redux";
import { listSort } from "../components/Sort/Sort";
import { selectFilter } from "../redux/filter/selectors";
import { selectPizza } from "../redux/pizza/selectors";
import { setCurrentPage, setFilters } from "../redux/filter/slice";
import { IFilterSlice } from "../redux/filter/types";
import { fetchPizza } from "../redux/pizza/asyncActions";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sortBy, searchValue, currentPage } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizza);

  React.useEffect(() => {
    if (window.location.search && !isMounted) {
      const params = qs.parse(window.location.search.substring(1));
      const sortProperty = listSort.find((item) => item.sortProperty === params.sortBy);

      if (sortProperty) {
        dispatch(
          setFilters({
            ...params,
            sortBy: sortProperty,
          } as IFilterSlice)
        );
      }
    }
    isSearch.current = true;
  }, []);

  const getPizzaz = async () => {
    const category = categoryId > 0 ? `category=${categoryId}&` : "";
    const search = searchValue ? `search=${searchValue}&` : "";
    const sortByTmp = sortBy.sortProperty.replace("-", "");
    const order = sortBy.sortProperty.startsWith("-") ? "desc" : "asc";

    dispatch(
      fetchPizza({
        category,
        search,
        sortBy: sortByTmp,
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
  }, [categoryId, sortBy, searchValue, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortBy.sortProperty,
        categoryId,
        currentPage,
      });
      navigate("?" + queryString);
    }
    isMounted.current = true;
    isSearch.current = true;
  }, [categoryId, sortBy, searchValue, currentPage]);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
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
