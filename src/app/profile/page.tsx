"use client";

import { useState, useEffect } from "react";
import { verifyToken } from "@/lib/functions/verifyCookie";
import { LearnerDashboardComponent } from "@/components/components-learner-dashboard-component";
import Link from "next/link";

export default function Page() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const tokenValid = verifyToken();
      setIsAuthenticated(tokenValid);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4 text-center">Access Restricted</h1>
          <p className="mb-6 text-center text-gray-600">
            This page is only accessible to registered users. Your session may have expired or you haven't logged in yet.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/login" passHref>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">
                Login
              </button>
            </Link>
            <Link href="/register" passHref>
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">
                Register
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <LearnerDashboardComponent />;
}