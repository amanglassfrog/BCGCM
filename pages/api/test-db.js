import clientPromise from '../../src/lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Test database connection
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'bcgcm');
    
    // Test basic operations
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(col => col.name);
    
    // Check if bookings collection exists, if not create it
    if (!collectionNames.includes('bookings')) {
      await db.createCollection('bookings');
      // Create indexes
      await db.collection('bookings').createIndex(
        { appointmentDate: 1, appointmentTimeSlot: 1 }, 
        { unique: true }
      );
      await db.collection('bookings').createIndex({ email: 1 });
      await db.collection('bookings').createIndex({ mobileNumber: 1 });
      await db.collection('bookings').createIndex({ appointmentDate: 1 });
      
      // Initialize with sample data (optional)
      console.log('Bookings collection created with indexes');
    }
    
    return res.status(200).json({
      message: 'Database connection successful',
      database: db.databaseName,
      collections: collectionNames,
      hasBookingsCollection: collectionNames.includes('bookings'),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return res.status(500).json({
      message: 'Database connection failed',
      error: error.message,
      instructions: 'Please check your MONGODB_URI environment variable'
    });
  }
}
