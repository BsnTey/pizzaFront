import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import React from "react";
import { setCategoryId } from "../../redux/filter/slice";

const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

export const Categories: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const { categoryId } = useSelector((state: RootState) => state.filter);

  return (
    <div className="categories">
      <ul>
        {categories.map((nameCategory) => {
          const index = categories.indexOf(nameCategory);

          return (
            <li key={index} onClick={() => dispatch(setCategoryId(index))} className={index === categoryId ? "active" : ""}>
              {nameCategory}
            </li>
          );
        })}
      </ul>
    </div>
  );
});
