import { useState, FormEvent } from "react";
import NavBar from "../components/NavBar/NavBar";
import PasswordInput from "../components/Inputs/PasswordInput";
import { Link, Navigate } from "react-router-dom";
import { validateEmail } from "../utils/helper";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name) {
      setError("Please enter your name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please Create your password");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/auth/create_acct", {
        method: "POST",
        body: JSON.stringify({ fullname: name, email, password }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      alert(data.message);
      if (!data.error) {
        return <Navigate to="/" />;
      }

      setError("");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <NavBar />

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-2 py-10">
          <form onSubmit={handleSubmit}>
            <h4 className="text-2xl mb-3">Sign Up</h4>
            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
            <button type="submit" className="btn-primary">
              Sign Up
            </button>
            <p className="text-sm text-center mt-4">
              Already have an Account?
              <Link to="/" className="font-medium text-primary ml-3 underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
