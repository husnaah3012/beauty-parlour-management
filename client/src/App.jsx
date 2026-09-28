import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import BookAppointment from "./pages/BookAppointment";
import MyAppointments from "./pages/MyAppointments";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (window.location.pathname === "/services") {
    return <Services />;
  }

  if (window.location.pathname === "/book-appointment") {
    return <BookAppointment />;
  }

  if (window.location.pathname === "/my-appointments") {
    return <MyAppointments />;
  }

  if (token) {
    if (role === "admin") {
    return <AdminDashboard />;
   }

  return <Dashboard />;
}

  return <Login />;
}

export default App;