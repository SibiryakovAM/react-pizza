const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
  targetCount: {},
};
const cart = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PIZZA":
      const carrentPizzaItems = !state.items[
        action.payload.id + action.payload.type + action.payload.size
      ]
        ? [action.payload]
        : [
            ...state.items[
              action.payload.id + action.payload.type + action.payload.size
            ].items,
            action.payload,
          ];
      const newItems = {
        ...state.items,
        [action.payload.id + action.payload.type + action.payload.size]: {
          items: carrentPizzaItems,
          targetPrice: carrentPizzaItems.reduce(
            (sum, obj) => obj.price + sum,
            0
          ),
        },
      };
      const targetCount = !state.targetCount[action.payload.id]
        ? 1
        : state.targetCount[action.payload.id] + 1;

      const buffTargetCount = {
        ...state.targetCount,
        [action.payload.id]: targetCount,
      };

      const buff = Object.values(newItems).map((obj) => obj.items);
      const allPizzas = [].concat.apply([], buff);
      const totalPrice = allPizzas.reduce((sum, obj) => obj.price + sum, 0);
      return {
        ...state,
        items: newItems,
        totalCount: allPizzas.length,
        totalPrice,
        targetCount: buffTargetCount,
      };
    case "CLEAR_CART":
      return { totalPrice: 0, totalCount: 0, items: {}, targetCount: {} };
    case "PLUS_PIZZA": {
      const plusItem = [
        ...state.items[
          action.payload.id + action.payload.type + action.payload.size
        ].items,
        state.items[
          action.payload.id + action.payload.type + action.payload.size
        ].items[0],
      ];
      const buffTotalPrice =
        state.totalPrice +
        state.items[
          action.payload.id + action.payload.type + action.payload.size
        ].items[0].price;
      const buffTotalCount = state.totalCount + 1;
      const targetCount = {
        ...state.targetCount,
        [action.payload.id]: state.targetCount[action.payload.id] + 1,
      };

      return {
        ...state,
        targetCount,
        totalCount: buffTotalCount,
        totalPrice: buffTotalPrice,
        items: {
          ...state.items,
          [action.payload.id + action.payload.type + action.payload.size]: {
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
          action.payload.id + action.payload.type + action.payload.size
        ].items.length > 1
          ? state.items[
              action.payload.id + action.payload.type + action.payload.size
            ].items.slice(1)
          : state.items[
              action.payload.id + action.payload.type + action.payload.size
            ].items;
      const buffTargetPrice =
        state.items[
          action.payload.id + action.payload.type + action.payload.size
        ].items.length > 1
          ? minusItemArr[
              action.payload.id + action.payload.type + action.payload.size
            ].targetPrice -
            minusItemArr[
              action.payload.id + action.payload.type + action.payload.size
            ].items[0].price
          : minusItemArr[
              action.payload.id + action.payload.type + action.payload.size
            ].targetPrice;

      const buffTotalPrice =
        state.items[
          action.payload.id + action.payload.type + action.payload.size
        ].items.length > 1
          ? state.totalPrice -
            minusItemArr[
              action.payload.id + action.payload.type + action.payload.size
            ].items[0].price
          : state.totalPrice;
      const buffTotalCount =
        state.items[
          action.payload.id + action.payload.type + action.payload.size
        ].items.length > 1
          ? state.totalCount - 1
          : state.totalCount;
      const targetCount =
        state.items[
          action.payload.id + action.payload.type + action.payload.size
        ].items.length > 1
          ? state.targetCount[action.payload.id] - 1
          : state.targetCount[action.payload.id];
      console.log(state.targetCount[action.payload.id]);
      const buffTargetCount = {
        ...state.targetCount,
        [action.payload.id]: targetCount,
      };
      return {
        ...state,
        totalCount: buffTotalCount,
        totalPrice: buffTotalPrice,
        targetCount: buffTargetCount,
        items: {
          ...state.items,
          [action.payload.id + action.payload.type + action.payload.size]: {
            items: minusItem,
            targetPrice: buffTargetPrice,
          },
        },
      };
    }
    case "REMOVE_PIZZA": {
      const deleteItems = {
        ...state.items,
      };
      const buffTotalPrice =
        state.totalPrice -
        deleteItems[
          action.payload.id + action.payload.type + action.payload.size
        ].targetPrice;
      const buffTotalCount =
        state.totalCount -
        deleteItems[
          action.payload.id + action.payload.type + action.payload.size
        ].items.length;
      delete deleteItems[
        action.payload.id + action.payload.type + action.payload.size
      ];
      const targetCount = {
        ...state.targetCount,
        [action.payload.id]:
          state.targetCount[action.payload.id] -
          state.items[
            action.payload.id + action.payload.type + action.payload.size
          ].items.length,
      };
      return {
        ...state,
        targetCount,
        items: deleteItems,
        totalPrice: buffTotalPrice,
        totalCount: buffTotalCount,
      };
    }
    default:
      return state;
  }
};

export default cart;
