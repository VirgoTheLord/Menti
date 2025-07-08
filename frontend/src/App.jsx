import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLayout from "./components/layout/UserLayout";
import Hero from "./pages/Hero";
import CreateQuiz from "./pages/CreateQuiz";
import JoinQuiz from "./pages/JoinQuiz";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserQuiz from "./pages/UserQuiz";
import AdminQuiz from "./pages/AdminQuiz";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/join-quiz" element={<JoinQuiz />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/quiz/:room" element={<UserQuiz />} />
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Hero />} />
          <Route path="create" element={<CreateQuiz />} />
          <Route path="admin/:room" element={<AdminQuiz />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
