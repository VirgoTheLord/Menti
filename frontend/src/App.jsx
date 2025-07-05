import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/layout/UserLayout";
import Hero from "./pages/Hero";
import CreateQuiz from "./pages/CreateQuiz";
import JoinQuiz from "./pages/JoinQuiz";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/join-quiz" element={<JoinQuiz />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Hero />} />

            <Route path="create" element={<CreateQuiz />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
