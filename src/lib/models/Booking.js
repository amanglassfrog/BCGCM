import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  mobileNumber: {
    type: String,
    required: true,
    trim: true
  },
  selectedDate: {
    type: String,
    required: true
  },
  selectedTime: {
    type: String,
    required: true
  },
  upiTransactionId: {
    type: String,
    required: true,
    trim: true
  },
  bookingDateTime: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled', 'completed'],
    default: 'confirmed'
  },
  // Store the actual date and time for availability checking
  appointmentDate: {
    type: Date,
    required: true
  },
  appointmentTimeSlot: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Create compound index to prevent double bookings
bookingSchema.index({ appointmentDate: 1, appointmentTimeSlot: 1 }, { unique: true });

// Create index for email and mobile number for quick lookups
bookingSchema.index({ email: 1 });
bookingSchema.index({ mobileNumber: 1 });

// Create index for date range queries
bookingSchema.index({ appointmentDate: 1 });

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

export default Booking;
