import axios from 'axios';
import api from '../utils/api';
import React, { useEffect, useState } from 'react';

 

const AvailableSharedRides = () => {
  const [rides, setRides] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await api.get('/api/ride/shared-rides');
        setRides(response.data.rides);
        console.log('Available shared rides:', response.data.rides);
      } catch (err) {
        console.error('Error fetching shared rides:', err);
        setError(err.message);
      }
    };
    
    fetchRides();
  }, []);

  const handleShareRide = () =>alert('Ride shared successfully! Contact the driver for more details.');

  return (
    <div className="my-[200px]">
      <h2 className="text-xl text-center font-bold mb-4">Available Shared Rides</h2>
      {error && <p className="text-red-500">Error: {error}</p>}
      <ul>
        {rides.map((ride) => (
          <>
          <li className=' border-black border-2 p-10 my-1.5 mx-[50px]' key={ride._id}>
            {/* <p>Pickup: {ride.pickupLocation?.address}</p> */}
            <p>Drop: {ride.dropLocation?.address}</p>
            <p>Status: {ride.rideStatus}</p>
            <p>fare: {ride.fare}</p>
            <p>contact number of Driver: {ride.driverPhoneNumber}</p>
          </li>
          <div className='flex justify-center w-[90vw]'> 

          <button onClick={()=>handleShareRide()} className="mt-3 px-4 m-auto  py-2 bg-green-600 text-white rounded">
              Share Ride
          </button>
          </div>
              </>
        ))}
      </ul>
    </div>
  );
};

export default AvailableSharedRides;
