import express from 'express';
import mainRouter from './routes/router.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
const server = express();

server.use(bodyParser.urlencoded({ extended: false }));

server.use(bodyParser.json());

server.use(cookieParser());

server.use('/api', mainRouter);

server.use('*', (req, res) => {
    res.json({message: 'Endpoint invalid'}).status(403);
});

server.listen(4000, () => console.log(`[BACKEND] <==> || Successfully started Backend Server! || <==> [BACKEND]`));