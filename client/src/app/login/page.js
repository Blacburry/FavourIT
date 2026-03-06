"use client";

import { useState } from "react";
import API from "../../services/api";
import { Button } from "../../components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const router = useRouter();

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });

    const { token, user } = res.data;

    // store token
    localStorage.setItem("token", token);

    // store user
    localStorage.setItem("user", JSON.stringify(user));

    console.log("Logged in user:", user);

    // redirect based on local session role selection
    if (role === "tutor") {
      router.push("/tutor");
    } else {
      router.push("/dashboard");
    }

  } catch (error) {
    console.error(error);
    alert("Login failed");
  }
};


  return (
    <div className="flex justify-center items-center h-screen">

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-80"
      >

        <h1 className="text-2xl font-bold">Login</h1>

        {/* ROLE SELECTOR */}
        <div className="flex gap-3">

          <button
            type="button"
            onClick={() => setRole("student")}
            className={`flex-1 p-2 border rounded ${
              role === "student"
                ? "bg-black text-white"
                : "bg-white"
            }`}
          >
            Student
          </button>

          <button
            type="button"
            onClick={() => setRole("tutor")}
            className={`flex-1 p-2 border rounded ${
              role === "tutor"
                ? "bg-black text-white"
                : "bg-white"
            }`}
          >
            Tutor
          </button>

        </div>

        <input
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
          className="border p-2"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
          className="border p-2"
        />

        <Button type="submit">
          Login
        </Button>

      </form>

    </div>
  );
}