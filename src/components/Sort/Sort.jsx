import React from "react";
import { setSortType } from "../../redux/slice/filterSlice";
import { useSelector, useDispatch } from "react-redux";

export const listSort = [
  { name: "популярности (ASK)", sortProperty: "rating" },
  { name: "популярности (DESK)", sortProperty: "-rating" },
  { name: "цене (ASK)", sortProperty: "price" },
  { name: "цене (DESK)", sortProperty: "-price" },
  { name: "алфавиту (ASK)", sortProperty: "title" },
  { name: "алфавиту (DESK)", sortProperty: "-title" },
];

export const Sort = () => {
  const [visiblePopup, setVisiblePopup] = React.useState(false);
  const dispatch = useDispatch();
  const sortRef = React.useRef();

  const sortType = useSelector((state) => state.filter.sortType);

  const handleChangeClick = (obj) => {
    dispatch(setSortType(obj));
    setVisiblePopup(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      const path = e.composedPath();

      if (sortRef.current && !path.includes(sortRef.current)) {
        setVisiblePopup(false);
        console.log("setVisiblePopup");
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
};
