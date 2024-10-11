import React, { useState, useEffect } from "react";
import { Table, Input, Button, message } from "antd";

const { Search } = Input;

const DataFetchingComponent: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newEntry, setNewEntry] = useState({ name: "", email: "" });

  // Fetch API data
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (!response.ok) {
        throw new Error("Failed to load data.");
      }
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (err) {
      setError("Failed to load data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // API Call to add a new user (simulated)
  const addUser = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEntry),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add user.");
      }

      const newUser = await response.json();
      setData([...data, newUser]);
      message.success("User added successfully!");
    } catch (error) {
      message.error("Failed to add user.");
    }
  };

  // API Call to remove a user (simulated)
  const deleteUser = async (id: number) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user.");
      }

      setData(data.filter((item) => item.id !== id));
      message.success("User deleted successfully!");
    } catch (error) {
      message.error("Failed to delete user.");
    }
  };

  // Table columns definition for Ant Design
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: any) => (
        <Button danger onClick={() => deleteUser(record.id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Manage Users</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <Search
        placeholder="Search by name"
        onSearch={(value) => {
          const filteredData = data.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
          );
          setData(filteredData);
        }}
        enterButton
      />

      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="id"
        style={{ marginTop: "2rem" }}
      />

      <h3>Add New User</h3>
      <Input
        placeholder="Name"
        value={newEntry.name}
        onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
        style={{ marginBottom: "1rem" }}
      />
      <Input
        placeholder="Email"
        value={newEntry.email}
        onChange={(e) => setNewEntry({ ...newEntry, email: e.target.value })}
        style={{ marginBottom: "1rem" }}
      />
      <Button type="primary" onClick={addUser}>
        Add User
      </Button>
    </div>
  );
};

export default DataFetchingComponent;
