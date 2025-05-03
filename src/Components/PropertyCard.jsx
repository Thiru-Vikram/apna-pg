import React from 'react';
import './PropertyCard.css';

function PropertyCard({ property }) {
  return (
    <div className="property-card">
      <img 
        src={property.image} 
        alt={property.title} 
        className="property-image"
      />
      <h2 className="property-title">{property.title}</h2>
      <p className="property-location">{property.location}</p>
      <p className="property-rent">₹{property.rent}/month</p>
      <p className={`property-status ${property.available ? 'status-available' : 'status-unavailable'}`}>
        {property.available ? 'Available' : 'Not Available'}
      </p>
      <p className="property-contact">Contact: {property.contact}</p>
    </div>
  );
}

export default PropertyCard;