import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (!success) {
      toast.error("Invalid admin credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Admin Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mb-3 w-full px-3 py-2 border"
          />
          <input
            type="password"
            placeholder="Admin Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mb-3 w-full px-3 py-2 border"
          />
          <button className="w-full bg-black text-white py-2">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
