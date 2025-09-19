
import { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../utils/api';

const DriverDashboard = () => {
  const [availableRides, setAvailableRides] = useState([]);
  const [activeRide, setActiveRide] = useState(null);

  const fetchAvailableRides = async () => {
    try {
      const res = await api.get('/api/ride/available');
      setAvailableRides(res.data.rides);
    } catch (err) {
      console.error('Failed to fetch rides', err);
    }
  };

  const fetchMyRide = async () => {
    try {
      const res = await api.get('/api/ride/my-ride');
      if (res.data.success) {
        setActiveRide(res.data.ride);
        
      } else {
        setActiveRide(null);
      }
    } catch (err) {
      console.error('Failed to fetch my ride', err);
    }
  };

  useEffect(() => {
    fetchMyRide();
  }, []);

  useEffect(() => {
    if (!activeRide) {
      fetchAvailableRides();
    }
  }, [activeRide]);

  const acceptRide = async (rideId) => {
    try {
      const res = await api.put(
        `/api/ride/accept/${rideId}`,
        {}
      );
      alert('Ride accepted!');
      setActiveRide(res.data.ride);
      console.log('Accepted ride:', res.data.ride);
      setAvailableRides([]);

    } catch (err) {
      console.error('Failed to accept ride', err);
    }
  };



  const handleStartRide = async (rideId) => {
    try {
      const res = await api.post(
        `/api/ride/start/${rideId}`,
        {}
      );
      alert('Ride started');
      setActiveRide(res.data.ride);
    } catch (err) {
      console.error('Failed to start ride', err);
    }
  };

  const handleCompleteRide = async (rideId) => {
    try {
      const res = await api.post(
        `/api/ride/complete/${rideId}`,
        {}
      );
      alert('Ride completed');
      setActiveRide(null);
      fetchAvailableRides();
    } catch (err) {
      console.error('Failed to complete ride', err);
    }
  };

  const handleCancelRide = async (rideId) => {

  try {
    const response = await api.post(`/api/ride/cancel/${rideId}`,{});
    console.log(response.data.message);
    if(response.data.success) {
      setActiveRide(null);
      fetchAvailableRides();
      alert('Ride cancelled successfully');
    }
  } catch (err) {
    console.error(err.response?.data?.message || "Error cancelling ride");
  }
};

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Driver Dashboard</h2>

      {activeRide ? (
        <div className="p-4 border rounded bg-yellow-50">
          <p><strong>From:</strong> {activeRide.pickupLocation.address}</p>
          <p><strong>To:</strong> {activeRide.dropLocation.address}</p>
          <p><strong>Fare:</strong> {activeRide.fare} PKR</p>
          <p><strong>Status:</strong> {activeRide.rideStatus}</p>
          <p><strong>Rider Contact Number:</strong> {activeRide.rideMakerPhoneNumber}</p>

          {activeRide.rideStatus === 'accepted' && (
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => handleStartRide(activeRide._id)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                Start Ride
              </button>
              <button
                onClick={() => handleCancelRide(activeRide._id)}
                className="px-4 py-2 bg-red-500 text-white rounded"
                >
                Cancel Ride
              </button>
            </div>
          )}

          {activeRide.rideStatus === 'in-progress' && (
            <button
              onClick={() => handleCompleteRide(activeRide._id)}
              className="mt-3 px-4 py-2 bg-green-600 text-white rounded"
            >
              Complete Ride
            </button>
          )}
        </div>
      ) : (
        <div>
          {availableRides.length === 0 ? (
            <p>No rides available</p>
          ) : (
            <ul className="space-y-4">
              {availableRides.map((ride) => (
                <li key={ride._id} className="p-4 border rounded">
                  <p><strong>From:</strong> {ride.pickupLocation.address}</p>
                  <p><strong>To:</strong> {ride.dropLocation.address}</p>
                  <p><strong>Fare:</strong> {ride.fare} PKR</p>
                  <button
                    onClick={() => acceptRide(ride._id)}
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Accept Ride
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default DriverDashboard;
