import { getAvailableTimeSlots, isTimeSlotAvailable } from '../../src/lib/utils/availability';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { date, timeSlot } = req.query;

    if (!date) {
      return res.status(400).json({ message: 'Date parameter is required' });
    }

    if (timeSlot) {
      // Check specific time slot availability
      const isAvailable = await isTimeSlotAvailable(date, timeSlot);
      return res.status(200).json({ 
        date, 
        timeSlot, 
        isAvailable,
        message: isAvailable ? 'Time slot is available' : 'Time slot is already booked'
      });
    } else {
      // Get all available time slots for the date
      const availableSlots = await getAvailableTimeSlots(date);
      return res.status(200).json({ 
        date, 
        availableSlots,
        totalAvailable: availableSlots.length,
        message: `Found ${availableSlots.length} available time slots`
      });
    }
  } catch (error) {
    console.error('Error checking availability:', error);
    return res.status(500).json({ 
      message: 'Internal server error',
      error: error.message 
    });
  }
}
