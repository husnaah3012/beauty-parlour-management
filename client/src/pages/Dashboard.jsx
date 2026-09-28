function Dashboard() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.reload();
  };

  return (
    <div className="dashboard-page">

      {/* Header */}
      <header className="dashboard-header">

        <div className="brand-section">
          <div className="brand-logo">
            GG
          </div>

          <div>
            <h1>Glow & Grace</h1>
            <p>Beauty & Wellness</p>
          </div>
        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </header>


      {/* Hero Section */}
      <section className="dashboard-hero">

        <div className="hero-content">

          <span className="hero-small-text">
            WELCOME TO GLOW & GRACE
          </span>

          <h2>
            Your beauty,
            <br />
            your moment.
          </h2>

          <p>
            Discover premium beauty treatments
            designed to make you feel confident,
            refreshed and beautiful.
          </p>

          <button
            className="hero-btn"
            onClick={() =>
              (window.location.href = "/services")
            }
          >
            Explore Services
            <span>→</span>
          </button>

        </div>


        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80"
            alt="Beauty salon"
          />
        </div>

      </section>


      {/* Quick Actions */}
      <section className="dashboard-section">

        <div className="section-heading">

          <div>
            <span>OUR SERVICES</span>

            <h2>
              Everything you need
            </h2>
          </div>

          <button
            className="view-all-btn"
            onClick={() =>
              (window.location.href = "/services")
            }
          >
            View all
          </button>

        </div>


        <div className="dashboard-grid">

          {/* Services */}
          <div
            className="dashboard-card services-card"
            onClick={() =>
              (window.location.href = "/services")
            }
          >

            <div className="card-image">

              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=700&q=80"
                alt="Beauty services"
              />

            </div>

            <div className="card-content">

              <span className="card-label">
                BEAUTY
              </span>

              <h3>
                Beauty Services
              </h3>

              <p>
                Hair, skin, nails and premium
                beauty treatments.
              </p>

              <button>
                View Services
                <span>→</span>
              </button>

            </div>

          </div>


          {/* Booking */}
          <div
            className="dashboard-card booking-card"
            onClick={() =>
              (window.location.href =
                "/book-appointment")
            }
          >

            <div className="card-image">

              <img
                src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=700&q=80"
                alt="Book appointment"
              />

            </div>

            <div className="card-content">

              <span className="card-label">
                APPOINTMENT
              </span>

              <h3>
                Book Appointment
              </h3>

              <p>
                Choose your treatment and
                reserve your preferred time.
              </p>

              <button>
                Book Now
                <span>→</span>
              </button>

            </div>

          </div>


          {/* Appointments */}
          <div
            className="dashboard-card appointment-card"
            onClick={() =>
              (window.location.href =
                "/my-appointments")
            }
          >

            <div className="card-image">

              <img
                src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=700&q=80"
                alt="My appointments"
              />

            </div>

            <div className="card-content">

              <span className="card-label">
                MY BOOKINGS
              </span>

              <h3>
                My Appointments
              </h3>

              <p>
                Check your upcoming and
                previous appointments.
              </p>

              <button>
                View Appointments
                <span>→</span>
              </button>

            </div>

          </div>

        </div>

      </section>


      {/* Bottom Navigation */}
      <nav className="bottom-nav">

        <button
          className="active"
          onClick={() =>
            window.location.reload()
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

export default Dashboard;