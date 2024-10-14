import React, { useState, useEffect } from "react";
import { Table, Input, Button, Form, message } from "antd";

interface User {
  name: string;
  email: string;
  phone: string;
}

export default function App() {
  const [data, setData] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("Failed to load the data.");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError("Failed to load the data.");
      }
    };
    fetchData();
  }, []);

  const addUser = async (values: User) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add the user.");
      }
      const newUser = await response.json();
      setData([...data, newUser]);
      message.success("User added successfully.");
      form.resetFields();
    } catch (error) {
      message.error("Failed to add the user.");
    }
  };

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
    <div className="mx-auto p-4 max-w-4xl">
      <h1 className="text-xl mb-4 text-center">Contact List Management</h1>

      <Table columns={columns} dataSource={data} rowKey="id" />

      <Form
        form={form}
        onFinish={addUser}
        layout="vertical"
        className="mx-auto space-y-4 max-w-md"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input
            placeholder="Name"
            className="p-2 border border-gray-300 rounded w-full"
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input
            placeholder="Email"
            className="p-2 border border-gray-300 rounded w-full"
          />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: "Please enter your phone number" },
            {
              pattern: /^[0-9]{10}$/,
              message: "Please enter a valid phone number",
            },
          ]}
        >
          <Input
            placeholder="Phone Number"
            className="p-2 border border-gray-300 rounded w-full"
          />
        </Form.Item>

        <div className="flex justify-end">
          <Button
            type="primary"
            className="bg-blue-500 text-white py-2 px-4 rounded"
            htmlType="submit"
          >
            Add Contact
          </Button>
        </div>
      </Form>
    </div>
  );
}
