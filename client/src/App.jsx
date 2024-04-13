import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Auth from "./components/auth/Auth";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import PageNotFound from "./components/global/PageNotFound";
import useAuth from "./hooks/useAuth";

function App() {
  const location = useLocation();
  const authenticated = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          authenticated ? (
            <Layout />
          ) : (
            <Navigate to="/auth/login" replace state={{ from: location }} />
          )
        }
      />
      <Route path="auth" element={<Auth />}>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
