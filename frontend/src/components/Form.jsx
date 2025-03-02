import { useState } from "react";
import PropTypes from "prop-types";
const Form = ({ addItem }) => {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (itemName) {
      addItem(itemName, quantity);
      setItemName("");
      setQuantity(1);
    }
  };
  Form.propTypes = {
    addItem: PropTypes.func.isRequired,
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to your 😘 trip</h3>

      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
};

export default Form;
