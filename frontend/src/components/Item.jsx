import PropTypes from "prop-types";
const Item = ({ item, deleteItem, toggleItem }) => {
  Item.propTypes = {
    item: PropTypes.object.isRequired,
    deleteItem: PropTypes.func.isRequired,
    toggleItem: PropTypes.func.isRequired,
  };
  return (
    <li className="item">
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => toggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.name}
      </span>
      <button onClick={() => deleteItem(item.id)}>❌</button>
    </li>
  );
};
export default Item;
