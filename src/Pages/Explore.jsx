import React, { useState } from "react";
import "./Explore.css";
import properties from "../data/properties.json";
import PropertyCard from "../Components/PropertyCard";

function Explore() {
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    minRent: "",
    maxRent: "",
    availability: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 8;
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setIsLoading(true);
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setTimeout(() => setIsLoading(false), 500);
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      location: "",
      minRent: "",
      maxRent: "",
      availability: "",
    });
    setCurrentPage(1);
  };

  const filteredProperties = properties.filter((property) => {
    return (
      property.title.toLowerCase().includes(filters.search.toLowerCase()) &&
      (!filters.location || property.location === filters.location) &&
      (!filters.minRent || property.rent >= parseInt(filters.minRent)) &&
      (!filters.maxRent || property.rent <= parseInt(filters.maxRent)) &&
      (!filters.availability ||
        property.available.toString() === filters.availability)
    );
  });

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <div className="explore-page">
      <div className="filter-bar">
        <div className="search-container">
          <input
            type="text"
            name="search"
            placeholder="Search PGs..."
            value={filters.search}
            onChange={handleFilterChange}
          />
        </div>

        <div className="filters">
          <select
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
          >
            <option value="">All Locations</option>
            <option value="Chennai">Chennai</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Pune">Pune</option>
          </select>

          <div className="rent-filter">
            <select
              name="minRent"
              value={filters.minRent}
              onChange={handleFilterChange}
            >
              <option value="">Min Rent</option>
              <option value="4000">₹4000</option>
              <option value="5000">₹5000</option>
              <option value="6000">₹6000</option>
            </select>
            <select
              name="maxRent"
              value={filters.maxRent}
              onChange={handleFilterChange}
            >
              <option value="">Max Rent</option>
              <option value="6000">₹6000</option>
              <option value="7000">₹7000</option>
              <option value="8000">₹8000</option>
            </select>
          </div>

          <select
            name="availability"
            value={filters.availability}
            onChange={handleFilterChange}
          >
            <option value="">All Status</option>
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>

          <button className="clear-filters-button" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>

        <div className="results-count">
          Found {filteredProperties.length} results
        </div>
      </div>

      {isLoading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="properties-grid">
          {currentProperties.length > 0 ? (
            currentProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
            <div className="no-results">
              No properties found matching your criteria
            </div>
          )}
        </div>
      )}

      {filteredProperties.length > 0 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`pagination-button ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Explore;
