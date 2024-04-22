import Signin from "../../Users/Signin";
import Profile from "../../Users/Profile";
import UserTable from "../../Users/Table";
import AuthenticationPage from "../../Users";
import { Routes, Route, Navigate } from "react-router-dom";
export default function Account() {
  return (
    <div className="container-fluid">
      <Routes>
        <Route path="/" element={<Navigate to="/users/authenticate" />} />
        <Route path="/Admin/Users" element={<UserTable />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Profile/:username" element={<Profile />} />
      </Routes>
    </div>
  );
}
