import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSortBy, sortPropertyEnum } from "../../redux/filter/slice";
import { IsortBy } from "../../redux/filter/types";
import { selectSort } from "../../redux/filter/selectors";

export const listSort: IsortBy[] = [
  { name: "популярности (ASK)", sortProperty: sortPropertyEnum.PRICE_ASK },
  { name: "популярности (DESK)", sortProperty: sortPropertyEnum.PRICE_DESK },
  { name: "цене (ASK)", sortProperty: sortPropertyEnum.PRICE_ASK },
  { name: "цене (DESK)", sortProperty: sortPropertyEnum.PRICE_DESK },
  { name: "алфавиту (ASK)", sortProperty: sortPropertyEnum.TITLE_ASK },
  { name: "алфавиту (DESK)", sortProperty: sortPropertyEnum.TITLE_DESK },
];

export const Sort: React.FC = React.memo(() => {
  const [visiblePopup, setVisiblePopup] = React.useState(false);
  const dispatch = useDispatch();
  const sortRef = React.useRef<HTMLDivElement>(null);

  const sortType = useSelector(selectSort);

  const handleChangeClick = (obj: IsortBy) => {
    dispatch(setSortBy(obj));
    setVisiblePopup(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const path = e.composedPath();

      if (sortRef.current && !path.includes(sortRef.current)) {
        setVisiblePopup(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setVisiblePopup(!visiblePopup)}>{sortType.name}</span>
      </div>
      {visiblePopup && (
        <div className="sort__popup">
          <ul>
            {listSort.map((obj, i) => {
              return (
                <li key={i} className={sortType.name === obj.sortProperty ? "active" : ""} onClick={() => handleChangeClick(obj)}>
                  {obj.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
});
