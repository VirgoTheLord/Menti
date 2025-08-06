import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const userSchema = z.object({
    email: z.string().email("Invalid format"),
    password: z.string(6, "Password must be at least 6 characters"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email: email,
      password: password,
    };

    const res = userSchema.safeParse(formData);
    if (!res.success) {
      console.log("Validation failed", res.error.errors);
      return;
    }
    try {
      const response = await axios.post(
        "https://menti-qvzc.onrender.com/api/user/login",
        formData
      );
      if (response.status === 200) {
        console.log("User logged in successfully");
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        console.log("Failed to login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
  };
};

export default useLogin;
