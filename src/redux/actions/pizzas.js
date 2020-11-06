import axios from "axios";

export const fetchPizzas = (sortBy, category) => (disp) => {
  disp(setLoad(false));
  axios
    .get(
      `pizzas?${
        category ? `category=${category}` : ""
      }&_sort=${sortBy}&_order=${sortBy === "rating" ? `desc` : `asc`}`
    )
    .then(({ data }) => {
      disp(setPizzas(data));
    });
};

export const setPizzas = (items) => ({
  type: "SET_PIZZAS",
  payload: items,
});

export const setLoad = (payload) => ({
  type: "SET_LOAD",
  payload,
});
