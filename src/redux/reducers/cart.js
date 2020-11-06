const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};
const cart = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PIZZA":
      const carrentPizzaItems = !state.items[
        action.payload.id + action.payload.size + action.payload.type
      ]
        ? [action.payload]
        : [
            ...state.items[
              action.payload.id + action.payload.size + action.payload.type
            ].items,
            action.payload,
          ];
      const newItems = {
        ...state.items,
        [action.payload.id + action.payload.size + action.payload.type]: {
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
        ...state.items[
          action.payload.id + action.payload.size + action.payload.type
        ].items,
        state.items[
          action.payload.id + action.payload.size + action.payload.type
        ].items[0],
      ];
      const buffTotalPrice =
        state.totalPrice +
        state.items[
          action.payload.id + action.payload.size + action.payload.type
        ].items[0].price;
      const buffTotalCount = state.totalCount + 1;
      return {
        ...state,
        totalCount: buffTotalCount,
        totalPrice: buffTotalPrice,
        items: {
          ...state.items,
          [action.payload.id + action.payload.size + action.payload.type]: {
            items: plusItem,
            targetPrice: plusItem.reduce((sum, obj) => obj.price + sum, 0),
          },
        },
      };
    }
    case "MINUS_PIZZA": {
      const minusItemArr = {
        ...state.items,
      };

      const minusItem =
        state.items[
          action.payload.id + action.payload.size + action.payload.type
        ].items.length > 1
          ? state.items[
              action.payload.id + action.payload.size + action.payload.type
            ].items.slice(1)
          : state.items[
              action.payload.id + action.payload.size + action.payload.type
            ].items;
      const buffTargetPrice =
        state.items[
          action.payload.id + action.payload.size + action.payload.type
        ].items.length > 1
          ? minusItemArr[
              action.payload.id + action.payload.size + action.payload.type
            ].targetPrice -
            minusItemArr[
              action.payload.id + action.payload.size + action.payload.type
            ].items[0].price
          : minusItemArr[
              action.payload.id + action.payload.size + action.payload.type
            ].targetPrice;

      const buffTotalPrice =
        state.items[
          action.payload.id + action.payload.size + action.payload.type
        ].items.length > 1
          ? state.totalPrice -
            minusItemArr[
              action.payload.id + action.payload.size + action.payload.type
            ].items[0].price
          : state.totalPrice;
      const buffTotalCount =
        state.items[
          action.payload.id + action.payload.size + action.payload.type
        ].items.length > 1
          ? state.totalCount - 1
          : state.totalCount;

      return {
        ...state,
        totalCount: buffTotalCount,
        totalPrice: buffTotalPrice,
        items: {
          ...state.items,
          [action.payload.id + action.payload.size + action.payload.type]: {
            items: minusItem,
            targetPrice: buffTargetPrice,
          },
        },
      };
    }
    case "REMOVE_PIZZA":
      const deleteItems = {
        ...state.items,
      };
      const buffTotalPrice =
        state.totalPrice -
        deleteItems[
          action.payload.id + action.payload.size + action.payload.type
        ].targetPrice;
      const buffTotalCount =
        state.totalCount -
        deleteItems[
          action.payload.id + action.payload.size + action.payload.type
        ].items.length;
      delete deleteItems[
        action.payload.id + action.payload.size + action.payload.type
      ];
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
