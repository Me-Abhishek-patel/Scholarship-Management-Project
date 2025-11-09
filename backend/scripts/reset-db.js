const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const resetDatabase = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/scholarship_finder');
    
    console.log('🗑️  Dropping database...');
    await mongoose.connection.db.dropDatabase();
    
    console.log('✅ Database reset completed successfully!');
    console.log('💡 Restart the server to re-seed with fresh data');
    
  } catch (error) {
    console.error('❌ Error resetting database:', error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

resetDatabase(); 