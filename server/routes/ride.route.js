
import express from 'express';
import Ride from '../models/Ride.model.js';
import Driver from '../models/Driver.model.js';
import verifyToken from '../middlewares/verifyToken.js';

const rideRouter = express.Router();

rideRouter.post('/request', verifyToken, async (req, res) => {
  try {
    const {
      pickupLocation,
      dropLocation,
      fare,
      distanceKm,
      routePolyline,
      shared,
      rideMakerPhoneNumber
    } = req.body;

     

    const newRide = new Ride({
      rider: req.user._id,
      pickupLocation,
      dropLocation,
      fare,
      distanceKm,
      routePolyline,
      shared,
      rideMakerPhoneNumber,
    });

    await newRide.save();

    res.status(201).json({
      success: true,
      message: 'Ride booked successfully!',
      ride: newRide
    });
  } catch (error) {
    console.error('Error booking ride:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

rideRouter.get('/available', verifyToken, async (req, res) => {
  try {
    const rides = await Ride.find({
      driver: null,
      rideStatus: 'pending'
    });
    res.json({ success: true, rides });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch rides' });
  }
});

rideRouter.put('/accept/:rideId', verifyToken, async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.rideId);
    if (!ride || ride.driver) {
      return res.status(400).json({ success: false, message: 'Ride not available' });
    }

    ride.driver = req.user._id;
    ride.rideStatus = 'accepted';

    let driverPhoneNumber = await Driver.findById(req.user._id).select('phoneNumber');

    console.log('Driver Phone Number:', driverPhoneNumber);

    ride.driverPhoneNumber = driverPhoneNumber.phoneNumber;

    await ride.save();

    res.json({ success: true, message: 'Ride accepted', ride });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to accept ride' });
  }
});

rideRouter.get('/my-ride', verifyToken, async (req, res) => {
  try {
    const ride = await Ride.findOne({
      driver: req.user._id,
      rideStatus: { $in: ['accepted', 'started'] }
    });

    if (!ride) {
      return res.json({ success: false, message: 'No ride found' });
    }

    res.json({ success: true, ride });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch ride' });
  }
});


rideRouter.put('/complete/:rideId', verifyToken, async (req, res) => {
  const ride = await Ride.findById(req.params.rideId);
  if (!ride || String(ride.driver) !== req.user._id) {
    return res.status(403).json({ success: false, message: 'Unauthorized' });
  }

  ride.rideStatus = 'completed';
  await ride.save();

  res.json({ success: true, ride });
});

rideRouter.post('/cancel/:rideId', verifyToken, async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.rideId);
    console.log('Ride ID:', req.params.rideId);
    console.log('Ride found:', ride);
    if ( ride._id.toString() !== req.params.rideId) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }
    

    ride.rideStatus = 'cancelled';
    ride.driver = null; 
    await ride.save();

    res.json({ success: true, message: 'Ride cancelled successfully', ride });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to cancel ride' });
  }
});

rideRouter.post('/start/:rideId', verifyToken, async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.rideId);
    console.log('Ride ID:', req.params.rideId);
    console.log('Ride found:', ride);
    if ( ride._id.toString() !== req.params.rideId) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }
    ride.rideStatus = 'in-progress';
    ride.driver = null; 
    await ride.save();
    res.json({ success: true, message: 'Ride started successfully', ride });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to start ride' });
  }
});

rideRouter.post('/complete/:rideId', verifyToken, async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.rideId);
    console.log('Ride ID:', req.params.rideId);
    console.log('Ride found:', ride);
    if ( ride._id.toString() !== req.params.rideId) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }
    ride.rideStatus = 'completed';
    ride.driver = null; 
    await ride.save();
    res.json({ success: true, message: 'Ride completed successfully', ride });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to complete ride' });
  }
});

rideRouter.get('/shared-rides',  async (req, res) => {
  try {
    const rides = await Ride.find({
      shared: true,
      rideStatus: ['accepted', 'in-progress']
    })
    console.log('Available shared rides:', rides);
    res.status(200).json({ success: true, rides });
  } catch (err) {
    console.error('Error fetching shared rides:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch shared rides' });
  }
});

export default rideRouter;