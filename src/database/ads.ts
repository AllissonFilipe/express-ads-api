import { getDatabase } from "./mongo";
import { ObjectID } from "mongodb";

const collectionName = 'ads';

export async function insertAd(ad:any) {
    const database = await getDatabase();
    const {insertedId} = await database.collection(collectionName).insertOne(ad);
    return insertedId;
}
  
export async function getAds() {
    const database = await getDatabase();
    return await database.collection(collectionName).find({}).toArray();
}

export async function deleteAd(id:any) {
    const database = await getDatabase();
    await database.collection(collectionName).deleteOne({
      _id: new ObjectID(id),
    });
}

export async function updateAd(id:any, ad:any) {
    const database = await getDatabase();
    delete ad._id;
    await database.collection(collectionName).update(
      { _id: new ObjectID(id), },
      {
        $set: {
          ...ad,
        },
      },
    );
  }
  
  
  