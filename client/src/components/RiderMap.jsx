import { useState, useEffect } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
import axios from 'axios';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const lahoreCenter = { lat: 31.5204, lng: 74.3587 };

const RiderMap = () => {
  const mapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const navigate = useNavigate();

  const [showSharePopup, setShowSharePopup] = useState(false);

  const [pickup, setPickup] = useState(null);
  const [dropoff, setDropoff] = useState(null);

  
  const [pickupAddress, setPickupAddress] = useState('');
  const [dropoffAddress, setDropoffAddress] = useState('');

  
  const [distanceKm, setDistanceKm] = useState(0);
  const [fare, setFare] = useState(0);
  const [directionsData, setDirectionsData] = useState(null);

  const sharedRidesPagesHandler = () => {
    navigate('/shared-rides');
  }

  const handleMapClick = (latLng) => {
    if (!latLng) return;

    let lat, lng;

    if (typeof latLng.lat === 'function') {
      lat = latLng.lat();
      lng = latLng.lng();
    } else {
      lat = latLng.lat;
      lng = latLng.lng;
    }

    const clickedLatLng = { lat, lng };

    if (!pickup) {
      setPickup(clickedLatLng);
    } else if (!dropoff) {
      setDropoff(clickedLatLng);
    }
  };

  const resetSelection = () => {
    setPickup(null);
    setDropoff(null);
    setPickupAddress('');
    setDropoffAddress('');
    setDistanceKm(0);
    setFare(0);
    setDirectionsData(null);
  };

  
  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${mapsApiKey}`
      );
      const results = response.data.results;
      if (results && results.length > 0) {
        return results[0].formatted_address;
      } else {
        return 'Unknown address';
      }
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      return 'Unknown address';
    }
  };

  
  function calculateFare(km) {
  const baseFare = 200;          
  const baseDistance = 3;
  const perKmRate = 85;          

  const extraKm = Math.max(km - baseDistance, 0);
  let fare = baseFare + extraKm * perKmRate;
  console.log("UGA BUGA BUGA");
  

  return Math.round(fare);
};


  const handleConfirmRide = async () => {
  if (!pickup || !dropoff) return;

  // Show the popup first
  setShowSharePopup(true);
};

const rideMakerPhoneNumber = Cookies.get('rideMakerPhoneNumber'); 

const confirmRideWithSharing = async (shareOption) => {
  
  console.log('Share option selected:', shareOption);
  setShowSharePopup(false);

  try {
    const pAddress = pickupAddress || (await reverseGeocode(pickup.lat, pickup.lng));
    const dAddress = dropoffAddress || (await reverseGeocode(dropoff.lat, dropoff.lng));

    setPickupAddress(pAddress);
    setDropoffAddress(dAddress);

    const finalFare = calculateFare(distanceKm);

    const response = await api.post(
      '/api/ride/request',
      {
        pickupLocation: {
          type: 'Point',
          coordinates: [pickup.lng, pickup.lat],
          address: pAddress,
        },
        dropLocation: {
          type: 'Point',
          coordinates: [dropoff.lng, dropoff.lat],
          address: dAddress,
        },
        fare: finalFare,
        distanceKm,
        routePolyline: directionsData?.points || '',
        shared: shareOption,
        rideMakerPhoneNumber:rideMakerPhoneNumber // Add the sharing option to the request
      }
    );

    console.log('Ride booked:', response.data);
    alert('Ride booked successfully!');
  } catch (error) {
    console.error('Error booking ride:', error);
    alert('Failed to book ride, please try again.');
  }
};

const handleAddressToCoords = async (address, type) => {
  if (!address) return;

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${mapsApiKey}`
    );

    const results = response.data.results;
    if (results && results.length > 0) {
      const { lat, lng } = results[0].geometry.location;
      const location = { lat, lng };

      if (type === 'pickup') {
        setPickup(location);
      } else if (type === 'dropoff') {
        setDropoff(location);
      }
    } else {
      alert('Address not found');
    }
  } catch (error) {
    console.error('Geocoding error:', error);
    alert('Error finding address');
  }
};


  return (
    <APIProvider apiKey={mapsApiKey} libraries={["routes"]}>
      <Map
        style={{ width: '100vw', height: '100vh', position: 'fixed' }}
        center={lahoreCenter}
        zoom={12}
        mapId={'DEMO_MAP_ID'}
        gestureHandling="greedy"
        disableDefaultUI={false}
        zoomControl={true}
        scrollwheel={true}
        onClick={(e) => handleMapClick(e.detail.latLng)}
      >
        {pickup && (
          <AdvancedMarker position={pickup}>
            <InfoWindow position={pickup}>
              <p>Pickup Location: {pickupAddress || 'Selected'}</p>
            </InfoWindow>
          </AdvancedMarker>
        )}

        {dropoff && (
          <AdvancedMarker position={dropoff}>
            <InfoWindow position={dropoff}>
              <p>Dropoff Location: {dropoffAddress || 'Selected'}</p>
            </InfoWindow>
          </AdvancedMarker>
        )}

        {pickup && dropoff && (
          <Directions
            pickup={pickup}
            dropoff={dropoff}
            setDistanceKm={setDistanceKm}
            setFare={setFare}
            setDirectionsData={setDirectionsData}
          />
        )}
      </Map>


<div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white mt-[10vh] p-4 rounded-lg shadow-md space-y-2 w-[90vw] sm:w-[28rem] max-w-full">

  <input
    type="text"
    placeholder="Enter Pickup Address"
    value={pickupAddress}
    onChange={(e) => setPickupAddress(e.target.value)}
    onBlur={() => handleAddressToCoords(pickupAddress, 'pickup')}
    className="w-full px-3 py-2 border rounded"
  />
  <input
    type="text"
    placeholder="Enter Dropoff Address"
    value={dropoffAddress}
    onChange={(e) => setDropoffAddress(e.target.value)}
    onBlur={() => handleAddressToCoords(dropoffAddress, 'dropoff')}
    className="w-full px-3 py-2 border rounded"
  />
</div>

      
      {/* <div className="absolute top-20 left-4 z-50"> */}
      <div className="absolute top-[calc(100vh-300px)] left-1/2 transform -translate-x-1/2 z-50 w-[90vw] sm:w-auto flex flex-col items-center space-y-4 sm:items-start sm:left-4 sm:top-20 sm:translate-x-0">

        <button
          onClick={resetSelection}
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
        >
          Reset
        </button>
        {pickup && dropoff && (
  <div className="absolute top-32 left-4 z-50 flex flex-col space-y-2">
    <button
      onClick={handleConfirmRide}
      className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
    >
      Confirm Ride
    </button>

    <div className="mt-2 bg-white p-2 rounded shadow">
      <p>Distance: {distanceKm.toFixed(2)} km</p>
      <p>Fare: {fare} PKR</p>
    </div>
  </div>
)}

<button
      onClick={() => sharedRidesPagesHandler()}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg block mt-5 shadow-md hover:bg-blue-600"
    >
      See Available Shared Rides
    </button>

      </div>

  {showSharePopup && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
      <h3 className="text-lg font-semibold mb-4">Share this ride?</h3>
      <p className="mb-4">Would you like to make this ride available for sharing with others?</p>
      <div className="flex justify-between space-x-4">
        <button
          onClick={() => confirmRideWithSharing(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 flex-1"
        >
          Yes, Share Ride
        </button>
        <button
          onClick={() => confirmRideWithSharing(false)}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 flex-1"
        >
          No, Private Ride
        </button>
      </div>
    </div>
  </div>
)}

    </APIProvider>
  );
};

const Directions = ({
  pickup,
  dropoff,
  setDistanceKm,
  setFare,
  setDirectionsData,
}) => {
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  
  useEffect(() => {
    if (!map || !routesLibrary) return;

    const service = new routesLibrary.DirectionsService();
    const renderer = new routesLibrary.DirectionsRenderer({ map });

    setDirectionsService(service);
    setDirectionsRenderer(renderer);

    return () => {
      renderer.setMap(null); 
    };
  }, [map, routesLibrary]);

  
  useEffect(() => {
    if (!directionsService || !directionsRenderer || !pickup || !dropoff)
      return;

    directionsService
      .route({
        origin: pickup,
        destination: dropoff,
        travelMode: 'DRIVING',
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
        setRouteIndex(0);

        setDirectionsData(response.routes[0].overview_polyline);
        const distMeters = response.routes[0].legs[0].distance.value;
        const distKm = distMeters / 1000;
        setDistanceKm(distKm);

        const baseFare = 200;
        const baseDistance = 3;
        const perKmRate = 85;

        const extraKm = Math.max(distKm - baseDistance, 0);
        const totalFare = baseFare + extraKm * perKmRate;

        setFare(Math.round(totalFare));
      });
  }, [pickup, dropoff, directionsService, directionsRenderer, setDistanceKm, setFare, setDirectionsData]);

  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;

  return (
    <div className="absolute top-4 right-4 z-50 bg-white shadow-xl rounded-xl p-4 w-80 max-h-[80vh] overflow-y-auto space-y-2">
      <h2 className="text-lg font-semibold text-gray-800">{selected.summary}</h2>
      <p className="text-sm text-gray-700">
        {leg.start_address.split(',')[0]} to {leg.end_address.split(',')[0]}
      </p>
      <p className="text-sm text-gray-600">Distance: {leg.distance?.text}</p>
      <p className="text-sm text-gray-600">Duration: {leg.duration?.text}</p>

      <h3 className="mt-4 text-sm font-medium text-gray-800">Other Routes</h3>
      <ul className="space-y-1">
        {routes.map((route, index) => (
          <li key={index}>
            <button
              onClick={() => setRouteIndex(index)}
              className={`w-full text-left px-3 py-1 rounded-md text-sm ${
                index === routeIndex
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
            >
              {route.summary}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RiderMap;


