/* import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Markets from "./pages/Markets";
import { AuthProvider } from "./context/AuthContext";
import AdminDashboard from "./pages/AdminDashboard";
import MyApplications from "./pages/MyApplications";
import Profile from "./pages/Profile";

function App() {
    return (
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Markets />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-applications" element={<MyApplications />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    );
}

export default App; */


function App() {
  return <h1>TEST REACT</h1>;
}

export default App;
