export const addPizza = (obj) => ({
  type: "ADD_PIZZA",
  payload: obj,
});

export const clearCart = () => ({
  type: "CLEAR_CART",
});

export const removePizza = (obj) => ({
  type: "REMOVE_PIZZA",
  payload: obj,
});
export const plusPizza = (obj) => ({
  type: "PLUS_PIZZA",
  payload: obj,
});
export const minusPizza = (obj) => ({
  type: "MINUS_PIZZA",
  payload: obj,
});
