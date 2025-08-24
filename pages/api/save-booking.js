import { saveBooking, isTimeSlotAvailable } from '../../src/lib/utils/availability';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, mobileNumber, selectedDate, selectedTime, upiTransactionId } = req.body;

    // Validate required fields
    if (!name || !email || !mobileNumber || !selectedDate || !selectedTime || !upiTransactionId) {
      return res.status(400).json({ 
        message: 'All fields are required',
        missing: {
          name: !name,
          email: !email,
          mobileNumber: !mobileNumber,
          selectedDate: !selectedDate,
          selectedTime: !selectedTime,
          upiTransactionId: !upiTransactionId
        }
      });
    }

    // Check if the time slot is still available
    const isAvailable = await isTimeSlotAvailable(selectedDate, selectedTime);
    if (!isAvailable) {
      return res.status(409).json({ 
        message: 'This time slot is no longer available. Please select another time.',
        date: selectedDate,
        time: selectedTime
      });
    }

    // Save the booking
    const result = await saveBooking({
      name,
      email,
      mobileNumber,
      selectedDate,
      selectedTime,
      upiTransactionId
    });

    if (result.success) {
      return res.status(201).json({
        message: 'Booking saved successfully',
        bookingId: result.bookingId,
        date: selectedDate,
        time: selectedTime
      });
    } else {
      return res.status(500).json({
        message: 'Failed to save booking',
        error: result.error
      });
    }
  } catch (error) {
    console.error('Error saving booking:', error);
    return res.status(500).json({ 
      message: 'Internal server error',
      error: error.message 
    });
  }
}
