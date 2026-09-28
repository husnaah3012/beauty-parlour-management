import { useEffect, useState } from "react";
import axios from "axios";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5000/api/appointments/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAppointments(response.data.appointments);
      } catch (error) {
        console.log(error);

        setError(
          error.response?.data?.message ||
            "Failed to fetch appointments"
        );
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="appointments-page">

      {/* Header */}
      <header className="appointments-header">

        <button
          className="appointment-back-btn"
          onClick={() =>
            (window.location.href = "/")
          }
        >
          <span>←</span>
          Home
        </button>

        <div className="appointments-title">

          <span>GLOW & GRACE</span>

          <h1>My Appointments</h1>

          <p>
            Manage your beauty appointments
          </p>

        </div>

      </header>


      {/* Error */}
      {error && (
        <div className="appointment-error">
          <strong>Something went wrong</strong>
          <p>{error}</p>
        </div>
      )}


      {/* Empty State */}
      {!error && appointments.length === 0 && (
        <div className="empty-appointments">

          <div className="empty-icon">
            +
          </div>

          <span className="empty-label">
            YOUR BOOKINGS
          </span>

          <h2>
            No appointments yet
          </h2>

          <p>
            You haven't booked any beauty
            appointments yet. Explore our
            services and find something
            perfect for you.
          </p>

          <button
            onClick={() =>
              (window.location.href =
                "/services")
            }
          >
            Explore Services
            <span>→</span>
          </button>

        </div>
      )}


      {/* Appointment List */}
      {!error && appointments.length > 0 && (

        <main className="appointments-content">

          <div className="appointments-section-heading">

            <div>
              <span>YOUR BOOKINGS</span>

              <h2>
                Upcoming appointments
              </h2>
            </div>

            <p>
              {appointments.length} appointment
              {appointments.length !== 1
                ? "s"
                : ""}
            </p>

          </div>


          <div className="appointments-list">

            {appointments.map((appointment) => (

              <div
                className="appointment-card"
                key={appointment._id}
              >

                {/* Date */}
                <div className="appointment-date">

                  <span>
                    {new Date(
                      appointment.date
                    ).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                      }
                    )}
                  </span>

                  <strong>
                    {new Date(
                      appointment.date
                    ).getDate()}
                  </strong>

                  <small>
                    {new Date(
                      appointment.date
                    ).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "short",
                      }
                    )}
                  </small>

                </div>


                {/* Appointment Details */}
                <div className="appointment-info">

                  <span className="appointment-label">
                    BEAUTY APPOINTMENT
                  </span>

                  <h2>
                    {appointment.service}
                  </h2>

                  <p className="appointment-time">
                    Preferred appointment date
                  </p>

                </div>


                {/* Status */}
                <div
                  className={`status-badge ${appointment.status}`}
                >
                  <span className="status-dot"></span>

                  {appointment.status}
                </div>

              </div>

            ))}

          </div>

        </main>

      )}


      {/* Bottom Navigation */}
      <nav className="appointments-bottom-nav">

        <button
          onClick={() =>
            (window.location.href = "/")
          }
        >
          <span className="nav-icon">
            ⌂
          </span>

          <span>
            Home
          </span>
        </button>


        <button
          onClick={() =>
            (window.location.href =
              "/services")
          }
        >
          <span className="nav-icon">
            ✦
          </span>

          <span>
            Services
          </span>
        </button>


        <button
          onClick={() =>
            (window.location.href =
              "/book-appointment")
          }
        >
          <span className="nav-icon">
            +
          </span>

          <span>
            Book
          </span>
        </button>


        <button className="active">

          <span className="nav-icon">
            ▤
          </span>

          <span>
            Appointments
          </span>

        </button>

      </nav>

    </div>
  );
}

export default MyAppointments;