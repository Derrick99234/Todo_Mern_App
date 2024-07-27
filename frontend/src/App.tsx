import { Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import SignUp from "./Register/Register";
import Dashboard from "./Dashboard/Dashboard";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
