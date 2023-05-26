import { setCategoryId } from "../../redux/slice/filterSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";

const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

export const Categories: React.FC = () => {
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
};
