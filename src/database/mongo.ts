import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient } from "mongodb";

let database: any = null;

export async function startDatabase() {
    const mongo = new MongoMemoryServer();
    const mongoDBURL = await mongo.getConnectionString();
    const connection = await MongoClient.connect(mongoDBURL, {useNewUrlParser: true});
    database = connection.db();
}

export async function getDatabase() {
    if (!database) await startDatabase();
    return database;
}
  
  