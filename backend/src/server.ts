import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './services/routes/authRoutes';
import dataRoutes from './services/routes/dataRoutes';
import chatbotRoutes from "./services/routes/chatbotRoutes";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


app.use('/api', dataRoutes);
app.use('/auth', authRoutes);
app.use("/chatbot", chatbotRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});