import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';

dotenv.config();

// console.log(process.env.DATABASE_PASSWORD);

export const setUpServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  //   app.use(pino({
  //     transport:{
  //         target: "pino-pretty"
  //     }
  //   }))

  app.get('/', (req, res) => {
    res.json({
      message: 'Start work',
    });
  });

  app.use((req, res) => {
    res.status(404).json({
      message: `${req.url} not found`,
    });
  });

  app.use((error, res, req, next) => {
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  });

  const port = Number(process.env.PORT) || 3000;
  app.listen(3000, () => console.log(`Server running on ${port} port`));
};
