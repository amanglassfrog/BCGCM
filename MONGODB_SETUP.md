# MongoDB Setup Guide for BCGCM Booking System

## Overview
This guide explains how to set up MongoDB integration for the BCGCM booking system to prevent double bookings and manage time slot availability.

## Prerequisites
- MongoDB database (local or cloud-based like MongoDB Atlas)
- Node.js and npm installed

## Installation

### 1. Install Dependencies
```bash
npm install mongodb mongoose
```

### 2. Environment Configuration
Create a `.env.local` file in your project root with the following variables:

```env
# Email Configuration (existing)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# MongoDB Configuration (new)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bcgcm?retryWrites=true&w=majority
MONGODB_DB=bcgcm
```

### 3. MongoDB Connection String
Replace the `MONGODB_URI` with your actual connection string:

**For MongoDB Atlas:**
```
mongodb+srv://username:password@cluster.mongodb.net/bcgcm?retryWrites=true&w=majority
```

**For Local MongoDB:**
```
mongodb://localhost:27017/bcgcm
```

## Features Implemented

### 1. Time Slot Availability
- ✅ Real-time availability checking
- ✅ Prevents double bookings
- ✅ Shows booked slots as unavailable
- ✅ Dynamic time slot loading

### 2. Database Schema
- ✅ User booking information storage
- ✅ Unique constraints on date + time combinations
- ✅ Booking status tracking
- ✅ Timestamps and audit trail

### 3. API Endpoints
- ✅ `/api/check-availability` - Check time slot availability
- ✅ `/api/save-booking` - Save new bookings
- ✅ Integrated with existing email system

### 4. Frontend Integration
- ✅ Real-time availability display
- ✅ Loading states for time slots
- ✅ Visual indicators for booked slots
- ✅ Automatic refresh on date selection

## Database Collections

### Bookings Collection
```javascript
{
  name: String (required),
  email: String (required),
  mobileNumber: String (required),
  selectedDate: String (required),
  selectedTime: String (required),
  upiTransactionId: String (required),
  appointmentDate: Date (required),
  appointmentTimeSlot: String (required),
  status: String (enum: 'confirmed', 'cancelled', 'completed'),
  bookingDateTime: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## How It Works

### 1. Date Selection
When a user selects a date:
1. Frontend calls `/api/check-availability?date=...`
2. Backend queries MongoDB for existing bookings
3. Returns available time slots
4. Frontend updates UI to show only available slots

### 2. Booking Process
When a user completes booking:
1. Frontend sends booking data to `/api/send`
2. Email system sends confirmation emails
3. Backend saves booking to MongoDB
4. Time slot is marked as unavailable for future users

### 3. Availability Checking
- Real-time validation prevents race conditions
- Double-booking protection at database level
- Unique index on date + time combination

## Testing

### 1. Check API Endpoints
```bash
# Test availability checking
curl "http://localhost:3000/api/check-availability?date=December%2025,%202024"

# Test booking save
curl -X POST http://localhost:3000/api/save-booking \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","mobileNumber":"1234567890","selectedDate":"December 25, 2024","selectedTime":"2:00 PM","upiTransactionId":"TEST123"}'
```

### 2. Verify Database
Check your MongoDB database to see:
- Bookings collection created
- Indexes properly set
- Data being saved correctly

## Troubleshooting

### Common Issues

1. **Connection Failed**
   - Check MongoDB URI format
   - Verify network connectivity
   - Check firewall settings

2. **Authentication Error**
   - Verify username/password
   - Check database permissions
   - Ensure user has write access

3. **Time Slots Not Loading**
   - Check browser console for errors
   - Verify API endpoint is working
   - Check MongoDB connection status

### Debug Mode
Enable debug logging by uncommenting console.log statements in:
- `src/lib/utils/availability.js`
- `pages/api/check-availability.js`
- `pages/api/save-booking.js`

## Security Considerations

- ✅ Environment variables for sensitive data
- ✅ Input validation and sanitization
- ✅ Database connection pooling
- ✅ Error handling without data leakage

## Performance Optimizations

- ✅ Database indexes on frequently queried fields
- ✅ Connection pooling for MongoDB
- ✅ Efficient queries with projections
- ✅ Caching of available time slots

## Next Steps

After setup, consider implementing:
1. Admin dashboard for booking management
2. Booking cancellation functionality
3. Email notifications for booking updates
4. Analytics and reporting features
5. Backup and recovery procedures
