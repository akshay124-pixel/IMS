import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import EntryPage from "./components/EntryPage";
import OutStockDashboard from "./components/OutStockDashboard";
import OutStockPage from "./components/OutStockPage";
import StockDashboard from "./components/StockDashboard";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./auth/Login";
import SignUp from "./auth/Signup";

function App() {
  return (
    <Router>
      <ConditionalNavbar />
      <Routes>
        {/* Default route to redirect to login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/entry" element={<EntryPage />} />
        <Route path="/outdashboard" element={<OutStockDashboard />} />
        <Route path="/outstock" element={<OutStockPage />} />
        <Route path="/stockdashboard" element={<StockDashboard />} />
      </Routes>
    </Router>
  );
}

// Component to conditionally render the Navbar only on specific routes
const ConditionalNavbar = () => {
  const location = useLocation();

  // Determine if the current path is for authentication pages
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  return !isAuthPage ? <Navbar /> : null;
};

export default App;
