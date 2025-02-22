import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import News from "./components/news";
import Portfolio from "./components/Portfolio";
import SignUp from "./components/signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard"; // Import the Dashboard component
import "./App.css";
import FinanceBot from "./components/FinanceBot";

const Layout = ({ children }) => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard--content">{children}</div>
    </div>
  );
};

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  return (
    <Routes>
      {/* Authentication Routes */}
      <Route path="/" element={!token ? <SignUp onSignup={handleLogin} /> : <Navigate to="/dashboard" />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/signup" element={<SignUp onSignup={handleLogin} />} />

      {token && (
        <>
          <Route
            path="/dashboard"
            element={
              <Layout>
                <Dashboard /> 
              </Layout>
            }
          />
          <Route
            path="/news"
            element={
              <Layout>
                <News />
              </Layout>
            }
          />
          <Route
            path="/portfolio"
            element={
              <Layout>
                <Portfolio />
              </Layout>
            }
          />
          <Route
            path="/Advisor"
            element={
              <Layout>
                <FinanceBot />
              </Layout>
            }
          />

        </>
      )}
      <Route path="*" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
    </Routes>
  );
};

export default App;