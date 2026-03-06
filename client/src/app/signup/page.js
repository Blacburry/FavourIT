"use client";

import { useState } from "react";
import API from "../../services/api";
import { Button } from "../../components/ui/button";

export default function Signup() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    branch: "",
    year: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/signup", {
        ...form
      });

      alert("Signup successful");
      console.log(res.data);

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || err.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-80"
      >

        <h1 className="text-2xl font-bold text-center">Signup</h1>



        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="border p-2"
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-2"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-2"
        />

        <input
          name="branch"
          placeholder="Branch"
          onChange={handleChange}
          className="border p-2"
        />

        <input
          name="year"
          placeholder="Year"
          onChange={handleChange}
          className="border p-2"
        />

        <Button type="submit">
          Signup
        </Button>

      </form>

    </div>
  );
}