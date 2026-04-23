import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    itemName: "",
    description: "",
    type: ""
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${API}/api/items`);
      setItems(res.data);
    } catch (err) {
      console.log("FETCH ERROR:", err);
    }
  };

  const addItem = async () => {
    console.log("BUTTON CLICKED");
    console.log("FORM DATA:", form);
    console.log("TOKEN:", token);

    if (!form.itemName || !form.description || !form.type) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        `${API}/api/items`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("ITEM ADDED:", res.data);

      // reset form
      setForm({
        itemName: "",
        description: "",
        type: ""
      });

      fetchItems();
    } catch (err) {
      console.log("ADD ERROR:", err.response?.data || err);
      alert("Error adding item");
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API}/api/items/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      fetchItems();
    } catch (err) {
      console.log("DELETE ERROR:", err);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>📦 Lost & Found Dashboard</h2>

        <input
          placeholder="Item Name"
          value={form.itemName}
          onChange={(e) =>
            setForm({ ...form, itemName: e.target.value })
          }
        />

        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <input
          placeholder="Type (Lost/Found)"
          value={form.type}
          onChange={(e) =>
            setForm({ ...form, type: e.target.value })
          }
        />

        <button onClick={addItem}>➕ Add Item</button>

        <hr />

        {items.map((item) => (
          <div className="item" key={item._id}>
            <h4>{item.itemName}</h4>
            <p>{item.description}</p>
            <p><b>{item.type}</b></p>

            <button
              className="delete-btn"
              onClick={() => deleteItem(item._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;