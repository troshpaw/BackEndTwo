import {MongoClient, ObjectId} from "mongodb";
import {settings} from "../settings";

export const client = new MongoClient(settings.MONGO_URI);

export const connectDB = async () => {
    try {
        await client.connect();
        await client.db(settings.DB_NAME).command({ping: 1});
        console.log('Connected successfully to the mongo server');
    } catch (error) {
        console.log('Unable to connect to the mongo server');
        await client.close();
    }
}