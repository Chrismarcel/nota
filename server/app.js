import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use('/api', router);

app.get('/', (req, res) => res.status(200).json({ message: 'Welcome to the Nota app' }));

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
