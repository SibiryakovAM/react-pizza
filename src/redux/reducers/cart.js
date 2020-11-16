const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PIZZA":
      const carrentPizzaItems = !state.items[action.payload.id]
        ? [action.payload]
        : [...state.items[action.payload.id].items, action.payload];
      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: carrentPizzaItems,
          targetPrice: carrentPizzaItems.reduce(
            (sum, obj) => obj.price + sum,
            0
          ),
        },
      };
      const buff = Object.values(newItems).map((obj) => obj.items);
      const allPizzas = [].concat.apply([], buff);
      const totalPrice = allPizzas.reduce((sum, obj) => obj.price + sum, 0);
      return {
        ...state,
        items: newItems,
        totalCount: allPizzas.length,
        totalPrice,
      };
    case "CLEAR_CART":
      return { totalPrice: 0, totalCount: 0, items: {} };
    case "PLUS_PIZZA": {
      const plusItem = [
        ...state.items[action.payload].items,
        state.items[action.payload].items[0],
      ];
      const buffTotalPrice =
        state.totalPrice + state.items[action.payload].targetPrice;
      const buffTotalCount =
        state.totalCount + state.items[action.payload].items.length;
      return {
        ...state,
        items: {
          ...state.items,
          // totalPrice: buffTotalPrice,
          // totalCount: buffTotalCount,
          [action.payload]: {
            items: plusItem,
            targetPrice: plusItem.reduce((sum, obj) => obj.price + sum, 0),
          },
        },
      };
    }
    case "MINUS_PIZZA": {
      const minusItem =
        state.items[action.payload].items.length > 1
          ? state.items[action.payload].items.slice(1)
          : state.items[action.payload].items;
      const buffTotalPrice =
        state.totalPrice - minusItem[action.payload].targetPrice;
      const buffTotalCount =
        state.totalCount - minusItem[action.payload].items.length;

      return {
        ...state,
        items: {
          ...state.items,
          [action.payload]: {
            items: minusItem,
            totalPrice: buffTotalPrice,
            totalCount: buffTotalCount,
          },
        },
      };
    }
    case "REMOVE_PIZZA":
      const deleteItems = {
        ...state.items,
      };
      const buffTotalPrice =
        state.totalPrice - deleteItems[action.payload].targetPrice;
      const buffTotalCount =
        state.totalCount - deleteItems[action.payload].items.length;
      delete deleteItems[action.payload];
      return {
        ...state,
        items: deleteItems,
        totalPrice: buffTotalPrice,
        totalCount: buffTotalCount,
      };
    default:
      return state;
  }
};

export default cart;
