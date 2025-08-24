import clientPromise from '../mongodb';
import { ObjectId } from 'mongodb';

// Function to check if a time slot is available
export async function isTimeSlotAvailable(date, timeSlot) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'bcgcm');
    
    // Convert date string to Date object for comparison
    const appointmentDate = new Date(date);
    
    // Check if there's already a booking for this date and time
    const existingBooking = await db.collection('bookings').findOne({
      appointmentDate: appointmentDate,
      appointmentTimeSlot: timeSlot,
      status: { $ne: 'cancelled' } // Exclude cancelled bookings
    });
    
    return !existingBooking; // Return true if slot is available (no existing booking)
  } catch (error) {
    console.error('Error checking time slot availability:', error);
    return false; // Return false on error to be safe
  }
}

// Function to get all booked time slots for a specific date
export async function getBookedTimeSlots(date) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'bcgcm');
    
    const appointmentDate = new Date(date);
    
    const bookedSlots = await db.collection('bookings')
      .find({
        appointmentDate: appointmentDate,
        status: { $ne: 'cancelled' }
      })
      .project({ appointmentTimeSlot: 1 })
      .toArray();
    
    return bookedSlots.map(slot => slot.appointmentTimeSlot);
  } catch (error) {
    console.error('Error getting booked time slots:', error);
    return [];
  }
}

// Function to get all available time slots for a specific date
export async function getAvailableTimeSlots(date) {
  try {
    // Check if the date is a weekday (Monday to Friday)
    const appointmentDate = new Date(date);
    const dayOfWeek = appointmentDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    
    // Only allow Monday (1) to Friday (5)
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return []; // Return empty array for weekends
    }
    
    // Business hours: 2:00 PM to 5:00 PM with 30-minute slots
    const allTimeSlots = [
      '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM'
    ];
    
    const bookedSlots = await getBookedTimeSlots(date);
    const availableSlots = allTimeSlots.filter(slot => !bookedSlots.includes(slot));
    
    return availableSlots;
  } catch (error) {
    console.error('Error getting available time slots:', error);
    return [];
  }
}

// Function to save a new booking
export async function saveBooking(bookingData) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'bcgcm');
    
    // Convert date string to Date object
    const appointmentDate = new Date(bookingData.selectedDate);
    
    const booking = {
      ...bookingData,
      appointmentDate: appointmentDate,
      appointmentTimeSlot: bookingData.selectedTime,
      bookingDateTime: new Date(),
      status: 'confirmed',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('bookings').insertOne(booking);
    return { success: true, bookingId: result.insertedId };
  } catch (error) {
    console.error('Error saving booking:', error);
    return { success: false, error: error.message };
  }
}

// Function to get all bookings for admin
export async function getAllBookings() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'bcgcm');
    
    const bookings = await db.collection('bookings')
      .find({})
      .sort({ appointmentDate: 1, appointmentTimeSlot: 1 })
      .toArray();
    
    return bookings;
  } catch (error) {
    console.error('Error getting all bookings:', error);
    return [];
  }
}
