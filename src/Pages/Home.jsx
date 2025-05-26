import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import PropertyCard from "../Components/PropertyCard";
import Footer from "../Components/Footer";
import properties from "../data/properties.json";

function Home() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [propertyList, setPropertyList] = useState([]);

  useEffect(() => {
    try {
      setPropertyList(properties.slice(0, 4));
    } catch (error) {
      console.error("Error loading properties:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="home-page">
      <section className="hero">
        <h1>Find Your Perfect Stay</h1>
        <p>Affordable PGs and Hostels for Students</p>
        <button
          className="search-button"
          onClick={() =>
            document.querySelector(".property-grid").scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }
        >
          Search Now
        </button>
      </section>

      <section className="property-grid">
        {isLoading ? (
          <div className="loading">Loading properties...</div>
        ) : propertyList.length > 0 ? (
          <>
            {propertyList.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </>
        ) : (
          <div className="no-properties">No properties found</div>
        )}
      </section>

      <div className="explore-more-container">
        <button
          className="explore-more-button"
          onClick={() => navigate("/explore")}
        >
          Explore More
        </button>
      </div>

      <section className="why-choose-us">
        <h2>Why Choose Apna PG?</h2>
        <div className="features-grid">
          <ul>
            <li>
              <span className="feature-icon">✓</span>
              <span className="feature-text">Verified & Trusted Listings</span>
            </li>
            <li>
              <span className="feature-icon">💰</span>
              <span className="feature-text">Student-Friendly Rates</span>
            </li>
            <li>
              <span className="feature-icon">📍</span>
              <span className="feature-text">Prime Locations</span>
            </li>
            <li>
              <span className="feature-icon">🕒</span>
              <span className="feature-text">24/7 Support</span>
            </li>
          </ul>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
