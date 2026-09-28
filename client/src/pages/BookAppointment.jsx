import { useEffect, useState } from "react";
import axios from "axios";

function BookAppointment() {
  const selectedService =
    localStorage.getItem("selectedService") || "";

  const [services, setServices] = useState([]);
  const [service, setService] = useState(selectedService);
  const [date, setDate] = useState("");
  const [appointmentId, setAppointmentId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/service"
      );

      setServices(response.data.services);
    } catch (error) {
      console.log(error);
      alert("Failed to load services");
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/appointments",
        {
          service,
          date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAppointmentId(response.data.appointment._id);

      alert("Appointment booked successfully!");

      localStorage.removeItem("selectedService");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Appointment booking failed!"
      );
    }
  };

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");

      const transactionId = "DEMO-" + Date.now();

      const response = await axios.put(
        `http://localhost:5000/api/appointments/${appointmentId}/payment`,
        {
          transactionId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      setPaymentStatus("paid");

      alert("Demo payment successful!");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Payment failed!"
      );
    }
  };

  return (
    <div className="booking-page">

      {/* Header */}
      <header className="booking-header">

        <button
          className="back-btn"
          onClick={() =>
            (window.location.href = "/services")
          }
        >
          <span>←</span>
          Services
        </button>

        <div className="booking-title">

          <span>GLOW & GRACE</span>

          <h1>Book Appointment</h1>

          <p>
            Choose your treatment and preferred date
          </p>

        </div>

      </header>


      {/* Main Content */}
      <main className="booking-content">

        <div className="booking-layout">

          {/* Left Information */}
          <div className="booking-intro">

            <span className="booking-label">
              YOUR BEAUTY MOMENT
            </span>

            <h2>
              Take some time
              <br />
              for yourself.
            </h2>

            <p>
              Select a beauty treatment that suits
              you and choose a convenient date for
              your appointment.
            </p>

            <div className="booking-info-list">

              <div className="booking-info-item">

                <div className="booking-info-icon">
                  01
                </div>

                <div>
                  <h3>Choose a service</h3>
                  <p>
                    Select your preferred beauty
                    treatment.
                  </p>
                </div>

              </div>


              <div className="booking-info-item">

                <div className="booking-info-icon">
                  02
                </div>

                <div>
                  <h3>Select your date</h3>
                  <p>
                    Pick a date that works for you.
                  </p>
                </div>

              </div>


              <div className="booking-info-item">

                <div className="booking-info-icon">
                  03
                </div>

                <div>
                  <h3>Confirm & pay</h3>
                  <p>
                    Complete your booking securely.
                  </p>
                </div>

              </div>

            </div>

          </div>


          {/* Booking Card */}
          <div className="booking-card">

            <div className="booking-card-header">

              <div>
                <span>APPOINTMENT</span>

                <h2>
                  Appointment Details
                </h2>
              </div>

              <div className="booking-card-icon">
                +
              </div>

            </div>


            <form onSubmit={handleBooking}>

              <div className="booking-field">

                <label>
                  Choose Service
                </label>

                <select
                  value={service}
                  onChange={(e) =>
                    setService(e.target.value)
                  }
                  required
                >

                  <option value="">
                    Select a service
                  </option>

                  {services.map((item) => (
                    <option
                      key={item._id}
                      value={item.name}
                    >
                      {item.name} - ₹{item.price}
                    </option>
                  ))}

                </select>

              </div>


              <div className="booking-field">

                <label>
                  Preferred Date
                </label>

                <input
                  type="date"
                  value={date}
                  onChange={(e) =>
                    setDate(e.target.value)
                  }
                  required
                />

              </div>


              <button
                type="submit"
                className="confirm-booking-btn"
              >
                <span>
                  Confirm Appointment
                </span>

                <strong>
                  →
                </strong>
              </button>

            </form>


            {/* Payment */}
            {appointmentId && (
              <div className="payment-box">

                {paymentStatus !== "paid" ? (
                  <>

                    <div className="payment-header">

                      <div>
                        <span>
                          BOOKING CONFIRMED
                        </span>

                        <h3>
                          Complete Payment
                        </h3>
                      </div>

                      <div className="payment-symbol">
                        ₹
                      </div>

                    </div>

                    <p>
                      Your appointment has been
                      successfully created. Complete
                      the demo payment to finish
                      your booking.
                    </p>

                    <button
                      onClick={handlePayment}
                      className="payment-btn"
                    >
                      <span>
                        Pay Now
                      </span>

                      <strong>
                        →
                      </strong>
                    </button>

                  </>
                ) : (
                  <div className="paid-message">

                    <div className="success-mark">
                      ✓
                    </div>

                    <span className="paid-label">
                      PAYMENT COMPLETED
                    </span>

                    <h3>
                      Your appointment is confirmed
                    </h3>

                    <p>
                      Payment Status:{" "}
                      <b>Paid</b>
                    </p>

                    <button
                      className="view-appointments-btn"
                      onClick={() =>
                        (window.location.href =
                          "/my-appointments")
                      }
                    >
                      View My Appointments
                      <span>→</span>
                    </button>

                  </div>
                )}

              </div>
            )}

          </div>

        </div>

      </main>


      {/* Bottom Navigation */}
      <nav className="booking-bottom-nav">

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


        <button className="active">

          <span className="nav-icon">
            +
          </span>

          <span>
            Book
          </span>

        </button>


        <button
          onClick={() =>
            (window.location.href =
              "/my-appointments")
          }
        >
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

export default BookAppointment;