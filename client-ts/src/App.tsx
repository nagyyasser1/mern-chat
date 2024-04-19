import Layout from "./components/Layout";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Auth from "./features/auth/Auth";
import Signup from "./features/auth/Signup";
import Login from "./features/auth/Login";
import PageNotFound from "./components/PageNotFound";
import useAuth from "./hooks/useAuth";

function App() {
  const isLoggedIn = useAuth();
  const location = useLocation();

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? (
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
