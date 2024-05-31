"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://flask-deploy-two.vercel.app/login",
        formData
      );
      Cookies.set("token", res.data.access_token, { expires: 1 }); // Save token in cookie for 1 day
      setMessage("Login successful");
      router.push("/products"); // Assuming you have a products page
    } catch (error: any) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen justify-center">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border-2 border-gray-400 p-2 rounded-md"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="border-2 border-gray-400 p-2 rounded-md"
        />
        <button className="bg-blue-500 text-white p-2 rounded-md" type="submit">
          Login
        </button>
      </form>
      {message && <p className="mt-4 text-red-600">{message}</p>}
      <p className="mt-5">
        Tidak punya akun{" "}
        <Link href={"/register"} className="text-blue-400">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Login;
