
import React, { useState, useEffect } from 'react';

function MyLocation() {
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  const zoom = 16; // 15 is ideal


  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

  return (
    <div>
            {position.latitude && position.longitude ? (
       <div>
             <iframe
                 width="600"
                 height="450"
                style={{ border: "none" }}
                 loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"  
                src={`https://maps.google.com/maps?q=${position.latitude},${position.longitude}&z=${zoom}&output=embed`}
                 title="google map"
             ></iframe>
         </div>
       ) : (
         <p>Fetching location...</p>
       )}

       <div>
        <p>latitude: {position.latitude}</p>
        <p>longitude: {position.longitude}</p>
       </div>
    </div>
  );
}

export default MyLocation;