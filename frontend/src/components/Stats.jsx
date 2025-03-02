import PropTypes from "prop-types";
const Stats = ({ items }) => {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding items for your packing list 🚀</em>
      </p>
    );
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  Stats.propTypes = {
    items: PropTypes.array.isRequired,
  };
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything! Ready to go ✈️"
          : `👜 you have ${numItems} items on your list , and you already packed
            ${numPacked}(${percentage}%)`}
      </em>
    </footer>
  );
};

export default Stats;
