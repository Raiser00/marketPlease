import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Markets from "./pages/Markets";
import { AuthProvider } from "./context/AuthContext";
import { MantineProvider } from "@mantine/core";
import AdminDashboard from "./pages/AdminDashboard";
import MyApplications from "./pages/MyApplications";
import Profile from "./pages/Profile";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import MarketsList from "./pages/MarketsList";
import EditMarket from "./pages/EditMarket";
import CreateMarket from "./pages/CreateMarket";
import UserList from "./pages/UsersList";
import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser";
import ApplicationManagement from "./pages/ApplicationManagement";

function App() {
    return (
      <MantineProvider>
      <BrowserRouter>
      <AuthProvider>
          <Routes>
            {/* toutes les routes passent par Layout */}
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/markets" element={<Markets />} />
              <Route path="/my-applications" element={<MyApplications />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<UserList />} />
              <Route path="/admin/users/create" element={<CreateUser />} />
              <Route path="/admin/users/:id/edit" element={<EditUser />} />
              <Route path="/admin/markets" element={<MarketsList />} />
              <Route path="/admin/markets/create" element={<CreateMarket />} />
              <Route path="/admin/markets/:id/edit" element={<EditMarket />} />
              <Route path="/admin/applications" element={<ApplicationManagement />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Route>
          </Routes>
          </AuthProvider>
        </BrowserRouter>
      </MantineProvider>

    );
}

export default App; 


