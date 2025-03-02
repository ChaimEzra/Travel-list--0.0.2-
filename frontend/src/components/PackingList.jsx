import { useState } from "react";
import Item from "./Item";
import PropTypes from "prop-types";
const PackingList = ({ items, deleteItem, clearList, toggleItem }) => {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "name")
    sortedItems = [...items].sort((a, b) => a.name.localeCompare(b.name));
  if (sortBy === "packed")
    sortedItems = [...items].sort(
      (a, b) => Number(a.packed) - Number(b.packed)
    );
  PackingList.propTypes = {
    items: PropTypes.array.isRequired,
    deleteItem: PropTypes.func.isRequired,
    clearList: PropTypes.func.isRequired,
    toggleItem: PropTypes.func.isRequired,
  };
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            deleteItem={deleteItem}
            toggleItem={toggleItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by the input order</option>
          <option value="name">Sort by name</option>
          <option value="packed">Sort by the packed status</option>
        </select>
        <button onClick={clearList}>Clear list</button>
      </div>
    </div>
  );
};
export default PackingList;
