import React from "react";
import {
  Categories,
  SortPopup,
  PizzaBlock,
  ContentLoader,
} from "../components";
import { useSelector, useDispatch } from "react-redux";
import { setCategory, setSortBy } from "../redux/actions/filter";
import { fetchPizzas } from "../redux/actions/pizzas";
import { addPizza } from "../redux/actions/cart";

const categoryName = [
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];
const catItems = [
  { name: "популярности", type: "rating", order: "desc" },
  { name: "цене", type: "price" },
  { name: "алфавиту", type: "name" },
];
let array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function Home() {
  const disp = useDispatch();
  const onSelectedCategory = React.useCallback((name) => {
    disp(setCategory(name));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSelectedSort = React.useCallback((name) => {
    disp(setSortBy(name));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const items = useSelector(({ pizzas }) => pizzas.items);
  const cartItems = useSelector(({ cart }) => cart.items);
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
  const { category, sortBy } = useSelector(({ filters }) => filters);
  React.useEffect(
    () => {
      disp(fetchPizzas(sortBy, category));
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [category, sortBy]
  );

  const addPizzaToCart = (obj) => {
    disp(addPizza(obj));
  };
  return (
    <div className="container">
      <div className="content__top">
        <Categories onClickItems={onSelectedCategory} items={categoryName} />
        <SortPopup
          onClickItems={onSelectedSort}
          items={catItems}
          activeSortType={sortBy}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoaded
          ? items.map((obj) => (
              <PizzaBlock
                key={obj.id}
                obj={obj}
                addPizzas={addPizzaToCart}
                addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
              />
            ))
          : array.map(() => <ContentLoader key={Math.random()} />)}
      </div>
    </div>
  );
}

export default Home;
