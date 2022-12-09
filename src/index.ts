import express, { Application } from 'express';
import cors from 'cors';
import { Server } from 'socket.io'
import { createServer } from 'http';
// import fileUpload from 'express-fileupload';

import pages_router from './routes/page';
import subpages_router from "./routes/subpages";
import images_router from './routes/images';
import pdfs_router from './routes/pdfs';

const PORT: string | number = process.env.PORT || 5000;

const app: Application = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:3000", 
                "http://192.168.100.5:3006", 
                "http://172.18.32.1:3006",
                "http://192.168.100.5"
                ]
    }
});

io.on('connection', (socket) => {
    // console.log(socket.id)
});



app.use(cors({
    origin: ["http://localhost:3000", 
                "http://192.168.100.5:3006", 
                "http://localhost:3006", 
                "http://172.18.32.1:3006",
                "http://192.168.100.5"]
}));

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('<h2>Welcome</h2>')
});

app.use('/pages', pages_router);
app.use('/subpages', subpages_router);
app.use('/images', images_router);
app.use('/pdfs', pdfs_router);

httpServer.listen(PORT, () => {
    console.log('[SERVER]: Server running on http://localhost:' + PORT)
});