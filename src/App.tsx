import React, { useState, useEffect } from "react";
import { Table, Input, Button, message } from "antd";
import "./App.css";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export default function App() {
  const [data, setData] = useState<User[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const result = await response.json();
        setData(result);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

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
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </>
  );
}
