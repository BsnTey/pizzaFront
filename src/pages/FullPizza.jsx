import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export const FullPizza = () => {
  const { id } = useParams();
  const [pizza, setPizza] = React.useState();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchData() {
      try {
        const URL = `https://646771742ea3cae8dc2f14d4.mockapi.io/api/items/${id}`;
        const res = await axios.get(URL);
        setPizza(res.data);
      } catch (error) {
        alert("Ошибка при запросе данных");
        navigate("/");
      }
    }
    fetchData();
  }, [id]);

  return pizza ? (
    <div className="container">
      <h1>{pizza.title}</h1>
      <img src={pizza.imageUrl} alt="pizza" />
      <div>Цена: {pizza.price}</div>
    </div>
  ) : (
    <div>Загрузка...</div>
  );
};
