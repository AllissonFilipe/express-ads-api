import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { startDatabase } from "./database/mongo";
import { insertAd, getAds, deleteAd, updateAd } from "./database/ads";

const app = express();

app.use(helmet());

app.use(express.json());

app.use(cors());

app.use(morgan('combined'));

app.get('/', async (req, res) => {
    res.send(await getAds());
});

app.post('/', async (req, res) => {
    const newAd = req.body;
    await insertAd(newAd);
    res.send({ message: 'New ad inserted.' });
});

app.delete('/:id', async (req, res) => {
    await deleteAd(req.params.id);
    res.send({ message: 'Ad removed.' });
});

app.put('/:id', async (req, res) => {
    const updatedAd = req.body;
    await updateAd(req.params.id, updatedAd);
    res.send({ message: 'Ad updated.' });
});  

startDatabase().then(async () => {
    await insertAd({title: 'Hello, now from the in-memory database!'});
  
    // start the server
    app.listen(3001, async () => {
      console.log('listening on port 3001');
    });
});
  
  