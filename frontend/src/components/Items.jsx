import { useEffect, useState } from "react";
import api from "../api.js";
import Form from "./Form";
import Logo from "./Logo";
import PackingList from "./PackingList";
import Stats from "./Stats";
const Items = () => {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await api.get("/items");
      setItems(response.data.items);
      console.log(response.data.items);
    } catch (error) {
      console.error("Error fetching items", error);
    }
  };

  const addItem = async (itemName, quantity) => {
    try {
      await api.post("/items", {
        name: itemName,
        quantity: quantity,
        packed: false,
        id: Date.now(),
      });
      fetchItems();
    } catch (error) {
      console.error("Error adding item", error);
    }
  };

  const deleteItem = async (item_id) => {
    try {
      await api.delete(`/items/${item_id}`, { id: item_id });
      fetchItems();
    } catch (error) {
      console.error("Error adding item", error);
    }
  };
  const clearList = async () => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete all items ?"
      );
      if (!confirmed) return;
      await api.delete("/items");
      fetchItems();
    } catch (error) {
      console.error("Error clearing list", error);
    }
  };
  const toggleItem = async (item_id) => {
    try {
      const item = items.find((item) => item.id === item_id);
      await api.put(`/items/${item_id}`, {
        ...item,
        packed: !item.packed,
      });
      fetchItems();
    } catch (error) {
      console.error("Error toggling item", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="app">
      <Logo />
      <Form addItem={addItem} />
      <PackingList
        items={items}
        deleteItem={deleteItem}
        clearList={clearList}
        toggleItem={toggleItem}
      />
      <Stats items={items} />
    </div>
  );
};

export default Items;
