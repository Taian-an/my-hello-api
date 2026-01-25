import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export async function GET() {
  try {
    await client.connect();
    const database = client.db('test_db');
    const collection = database.collection('test_collection');
    
    const data = await collection.find({}).toArray();
    
    return NextResponse.json({ status: "Success", data });
  } catch (error) {
    return NextResponse.json({ status: "Error", message: error.message }, { status: 500 });
  } finally {
    await client.close();
  }
}