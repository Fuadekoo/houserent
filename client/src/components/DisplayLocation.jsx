

import React from 'react';

const DisplayLocation = ({ latitude, longitude }) => {

    const zoom = 12
  return (
    <div>
    <h1 style={{color:"black"}}> <b>House Location</b></h1>
    <div>
      {latitude && longitude ? (
              <iframe
                width="400"
                height="250"
                style={{ border: "none" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=${zoom}&output=embed`}
                title="google map"
              ></iframe>
            ) : (
              <p>Fetching location...</p>
            )}
    </div>
      
    </div>
  );
};

export default DisplayLocation;
