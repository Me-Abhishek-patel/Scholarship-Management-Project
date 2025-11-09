const User = require('../models/User');
const Scholarship = require('../models/Scholarship');
const { users, hashPasswords } = require('./users');
const scholarships = require('./scholarships');

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Check if users already exist
    const existingUsers = await User.countDocuments();
    let adminUser;

    if (existingUsers === 0) {
      console.log('👥 Seeding users...');
      const hashedUsers = await hashPasswords(users);
      const createdUsers = await User.insertMany(hashedUsers);
      adminUser = createdUsers[0]; // First user is admin
      console.log(`✅ Created ${createdUsers.length} users`);
    } else {
      console.log('👥 Users already exist, skipping user seeding');
      adminUser = await User.findOne({ email: 'admin@scholarships.com' });
      if (!adminUser) {
        // Fallback: create admin user if it doesn't exist
        const hashedUsers = await hashPasswords([users[0]]);
        adminUser = await User.create(hashedUsers[0]);
        console.log('✅ Created admin user');
      }
    }

    // Check if scholarships already exist
    const existingScholarships = await Scholarship.countDocuments();
    
    if (existingScholarships === 0) {
      console.log('🎓 Seeding scholarships...');
      
      // Add createdBy field to all scholarships (link to admin user)
      const scholarshipsWithCreator = scholarships.map(scholarship => ({
        ...scholarship,
        createdBy: adminUser._id
      }));

      const createdScholarships = await Scholarship.insertMany(scholarshipsWithCreator);
      console.log(`✅ Created ${createdScholarships.length} scholarships`);
      
      // Display summary
      const categories = {};
      createdScholarships.forEach(s => {
        categories[s.category] = (categories[s.category] || 0) + 1;
      });
      
      console.log('📊 Scholarship breakdown:');
      Object.entries(categories).forEach(([category, count]) => {
        console.log(`   ${category}: ${count} scholarships`);
      });

      const totalAmount = createdScholarships.reduce((sum, s) => sum + s.amount, 0);
      console.log(`💰 Total scholarship amount: ₹${totalAmount.toLocaleString()}`);
      
    } else {
      console.log('🎓 Scholarships already exist, skipping scholarship seeding');
    }

    console.log('🌱 Database seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
};

module.exports = seedDatabase; 