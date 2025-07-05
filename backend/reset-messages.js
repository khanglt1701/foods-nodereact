const mongoose = require('mongoose');
const Message = require('./models/Message');
const seedMessage = require('./seed').seedMessage;

async function resetMessages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    await Message.deleteMany({});
    
    await seedMessage();
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

resetMessages(); 