import { setCategoryId } from "../../redux/slice/filterSlice";
import { useSelector, useDispatch } from "react-redux";

export const Categories = () => {
  const dispatch = useDispatch();
  const { categoryId } = useSelector((state) => state.filter);

  const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

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
};
