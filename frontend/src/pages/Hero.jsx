import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { Button } from "../components/ui/button";

const Hero = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  return (
    <section className="flex items-center justify-center min-h-screen bg-white">
      <Card className="w-full max-w-xl rounded-3xl shadow-xl border border-blue-100 bg-white/80 backdrop-blur-md px-6 py-10 md:px-10 md:py-16 flex flex-col items-center">
        <CardHeader className="w-full text-center mb-2">
          <CardTitle className="text-4xl md:text-5xl font-black font-barlow-condensed text-blue-900 tracking-tight">
            Welcome to <span className="text-blue-500">MentiMeter Clone</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full flex flex-col items-center">
          <p className="text-lg md:text-xl text-gray-700 mb-10 text-center max-w-xl">
            Create and join quizzes with ease!
          </p>
          <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
            {token ? (
              <>
                <Button
                  onClick={() => navigate("/create")}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-full shadow-md text-base"
                  size="lg"
                >
                  Create Quiz
                </Button>
                <Button
                  onClick={() => navigate("/join-quiz")}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-full shadow-md text-base"
                  size="lg"
                >
                  Join Quiz
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => navigate("/login")}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-full shadow-md text-base"
                  size="lg"
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate("/signup")}
                  className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 rounded-full shadow-md text-base"
                  size="lg"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Hero;
