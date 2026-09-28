import { useEffect, useState } from "react";
import axios from "axios";
import Popup from "../components/Popup";

function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");

  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/appointments/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAppointments(response.data.appointments);
      setError("");
    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.reload();
        return;
      }

      setError("Failed to load bookings");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateStatus = async (appointmentId, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/appointments/${appointmentId}/status`,
        {
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPopup({
        show: true,
        message:
          status === "confirmed"
            ? "Appointment confirmed successfully!"
            : "Appointment cancelled successfully!",
        type: status === "confirmed" ? "success" : "warning",
      });

      fetchAppointments();
    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.reload();
        return;
      }

      setPopup({
        show: true,
        message:
          error.response?.data?.message ||
          "Failed to update appointment",
        type: "error",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.reload();
  };

  const handlePopupClose = () => {
    setPopup({
      show: false,
      message: "",
      type: "success",
    });
  };

  return (
    <div className="admin-page">

      {/* HEADER */}
      <header className="admin-header">

        <div className="admin-brand">

          <div className="admin-brand-mark">
            GG
          </div>

          <div>
            <h1>Glow & Grace</h1>
            <p>Beauty & Wellness</p>
          </div>

        </div>

        <button
          className="admin-logout"
          onClick={handleLogout}
        >
          Logout
        </button>

      </header>


      {/* WELCOME BANNER */}
      <section className="admin-banner">

        <div className="admin-banner-content">

          <span>
            ADMINISTRATION
          </span>

          <h2>
            Manage your
            <br />
            salon with ease.
          </h2>

          <p>
            Keep track of customer appointments,
            manage bookings and provide a smooth
            beauty experience.
          </p>

        </div>

        <div className="admin-banner-decoration">
          <div></div>
          <div></div>
          <div></div>
        </div>

      </section>


      {/* BOOKING HEADER */}
      <section className="admin-bookings-header">

        <div>
          <span>
            APPOINTMENT MANAGEMENT
          </span>

          <h2>
            Customer bookings
          </h2>
        </div>

        <div className="booking-count">
          <strong>
            {appointments.length}
          </strong>

          <span>
            Total bookings
          </span>
        </div>

      </section>


      {/* ERROR */}
      {error && (
        <div className="admin-error">
          <strong>
            Something went wrong
          </strong>

          <p>
            {error}
          </p>
        </div>
      )}


      {/* EMPTY */}
      {appointments.length === 0 && !error ? (

        <div className="no-appointments">

          <div className="empty-admin-icon">
            +
          </div>

          <span>
            BOOKINGS
          </span>

          <h3>
            No bookings yet
          </h3>

          <p>
            Customer appointments will appear
            here once they make a booking.
          </p>

        </div>

      ) : (

        /* BOOKINGS */
        <main className="admin-appointments">

          {appointments.map((appointment) => (

            <article
              className="admin-appointment-card"
              key={appointment._id}
            >

              {/* CUSTOMER */}
              <div className="customer-avatar">
                {appointment.userId?.name
                  ?.charAt(0)
                  ?.toUpperCase() || "C"}
              </div>


              {/* DETAILS */}
              <div className="customer-details">

                <span className="customer-label">
                  CUSTOMER
                </span>

                <h3>
                  {appointment.userId?.name}
                </h3>

                <p className="customer-email">
                  {appointment.userId?.email}
                </p>


                <div className="appointment-info-row">

                  <div>

                    <span className="info-label">
                      SERVICE
                    </span>

                    <strong>
                      {appointment.service}
                    </strong>

                  </div>


                  <div>

                    <span className="info-label">
                      DATE
                    </span>

                    <strong>
                      {new Date(
                        appointment.date
                      ).toLocaleDateString(
                        "en-US",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </strong>

                  </div>

                </div>

              </div>


              {/* STATUS + ACTIONS */}
              <div className="admin-card-actions">

                <span className="status-label">
                  STATUS
                </span>

                <div
                  className={`admin-status-badge ${appointment.status}`}
                >
                  <span className="status-dot"></span>
                  {appointment.status}
                </div>


                {appointment.status === "pending" && (

                  <div className="admin-actions">

                    <button
                      className="confirm-btn"
                      onClick={() =>
                        updateStatus(
                          appointment._id,
                          "confirmed"
                        )
                      }
                    >
                      Confirm
                    </button>

                    <button
                      className="cancel-btn"
                      onClick={() =>
                        updateStatus(
                          appointment._id,
                          "cancelled"
                        )
                      }
                    >
                      Cancel
                    </button>

                  </div>

                )}

              </div>

            </article>

          ))}

        </main>

      )}


      {/* ADMIN BOTTOM NAV */}
      <nav className="admin-bottom-nav">

        <button
          className="active"
          onClick={() =>
            window.location.reload()
          }
        >
          <span className="admin-nav-icon">
            ⌂
          </span>

          <span>
            Dashboard
          </span>
        </button>


        <button
          onClick={() =>
            window.location.reload()
          }
        >
          <span className="admin-nav-icon">
            ▤
          </span>

          <span>
            Bookings
          </span>
        </button>


        <button onClick={handleLogout}>

          <span className="admin-nav-icon">
            ↪
          </span>

          <span>
            Logout
          </span>

        </button>

      </nav>


      {/* POPUP */}
      {popup.show && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={handlePopupClose}
        />
      )}

    </div>
  );
}

export default AdminDashboard;