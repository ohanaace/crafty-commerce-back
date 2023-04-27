import { MongoClient } from "mongodb"
import dotenv from "dotenv"

dotenv.config();
const mongoClient = new MongoClient(process.env.DATABASE_URL);
try {
    await mongoClient.connect(process.env.DATABASE_URL);
} catch (error) {
    console.log(error.message);
}
export const db = mongoClient.db();