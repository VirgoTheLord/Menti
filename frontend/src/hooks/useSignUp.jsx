import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const useSignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const userSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: username,
      email: email,
      password: password,
    };
    const res = userSchema.safeParse(formData);
    if (!res.success) {
      console.error("Validation failed", res.error.errors);
      return;
    }
    try {
      const response = await axios.post(
        "http://menti-backend-service/api/user/signup",
        formData
      );
      if (response.status === 200) {
        console.log("User signed up successfully");
        localStorage.setItem("token", response.data.token);
        navigate("/login");
      } else {
        console.error("Failed to sign up");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
  };
};

export default useSignUp;
