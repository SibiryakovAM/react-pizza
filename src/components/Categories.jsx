import React from "react";
const Categories = React.memo(function Categories({ items, onClickItems }) {
  const [state, setState] = React.useState(null);

  const activeCategory = (name) => {
    setState(name);
    onClickItems(name);
  };
  return (
    <div className="categories">
      <ul>
        <li
          className={state === null ? "active" : ""}
          onClick={() => activeCategory(null)}
        >
          Все
        </li>
        {items &&
          items.map((name) => (
            <li
              className={state === name ? "active" : ""}
              onClick={() => activeCategory(name)}
              key={name}
            >
              {name}
            </li>
          ))}
      </ul>
    </div>
  );
});

export default Categories;
