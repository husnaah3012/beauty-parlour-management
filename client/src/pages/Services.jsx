import { useEffect, useState } from "react";
import axios from "axios";

function Services() {
  const [services, setServices] = useState([]);

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

  const bookService = (service) => {
    localStorage.setItem("selectedService", service.name);
    window.location.href = "/book-appointment";
  };

  return (
    <div className="services-page">

      {/* Header */}
      <header className="services-header">

        <div className="services-title">

          <span>GLOW & GRACE</span>

          <h1>Beauty Services</h1>

          <p>
            Discover treatments designed for
            your beauty and wellness.
          </p>

        </div>

        <button
          className="home-btn"
          onClick={() => (window.location.href = "/")}
        >
          <span className="simple-icon">⌂</span>
          Home
        </button>

      </header>


      {/* Services */}
      <main className="services-content">

        <div className="services-section-title">

          <div>
            <span>OUR COLLECTION</span>

            <h2>
              Treatments for you
            </h2>
          </div>

          <p>
            {services.length} services available
          </p>

        </div>


        <div className="services-grid">

          {services.map((service) => (

            <div
              className="service-card"
              key={service._id}
            >

              {/* Image */}
              <div className="service-image-container">

                {service.image ? (
                  <img
                    src={
                      service.image.startsWith("http")
                        ? service.image
                        : `http://localhost:5000${service.image}`
                    }
                    alt={service.name}
                    className="service-image"
                  />
                ) : (
                  <div className="service-no-image">
                    Glow & Grace
                  </div>
                )}

              </div>


              {/* Content */}
              <div className="service-info">

                <span className="service-label">
                  BEAUTY TREATMENT
                </span>

                <h2>
                  {service.name}
                </h2>

                <p className="service-description">
                  {service.description}
                </p>


                {/* Details */}
                <div className="service-details">

                  <div className="service-detail">

                    <span className="detail-icon">
                      ₹
                    </span>

                    <div>
                      <small>PRICE</small>
                      <strong>
                        ₹{service.price}
                      </strong>
                    </div>

                  </div>


                  <div className="service-detail">

                    <span className="detail-icon">
                      ◷
                    </span>

                    <div>
                      <small>DURATION</small>
                      <strong>
                        {service.duration} min
                      </strong>
                    </div>

                  </div>

                </div>


                {/* Book Button */}
                <button
                  className="book-service-btn"
                  onClick={() => bookService(service)}
                >
                  <span>Book Appointment</span>
                  <strong>→</strong>
                </button>

              </div>

            </div>

          ))}

        </div>

      </main>


      {/* Bottom Navigation */}
      <nav className="services-bottom-nav">

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


        <button className="active">

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

export default Services;