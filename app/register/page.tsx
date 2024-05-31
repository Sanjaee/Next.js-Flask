"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // Ensure that useRouter is only used client-side
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "https://flask-deploy-two.vercel.app/register",
        formData
      );
      setMessage(res.data.message);
      router.push("/login");
    } catch (error: any) {
      setMessage(error.response?.data?.message || "An error occurred");
    }
    setLoading(false);
  };

  if (!isClient) {
    return null; // Prevents SSR issues with useRouter
  }

  return (
    <div className="flex flex-col items-center min-h-screen justify-center">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="border-2 border-gray-400 p-2 rounded-md"
        />
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
        <button
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded-md"
          type="submit"
        >
          {loading ? "Loading..." : "Register"}
        </button>
      </form>
      {message && <p className="text-red-600">{message}</p>}
      <p className="mt-5">
        Sudah punya akun{" "}
        <Link href={"/login"} className="text-blue-400">
          Sign un
        </Link>
      </p>
    </div>
  );
};

export default Register;
