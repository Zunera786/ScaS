
import mongoose from 'mongoose';

export async function connectDB() {
  const uri = 'mongodb+srv://23p61a05i7_db_user:Ioxmdng9YzjbouaU@db1.qxcucrz.mongodb.net/db1';
  if (!uri) throw new Error('MONGODB_URI not set');
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri);
  console.log('MongoDB connected');
}
