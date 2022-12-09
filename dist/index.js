"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
// import fileUpload from 'express-fileupload';
const page_1 = __importDefault(require("./routes/page"));
const subpages_1 = __importDefault(require("./routes/subpages"));
const images_1 = __importDefault(require("./routes/images"));
const pdfs_1 = __importDefault(require("./routes/pdfs"));
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
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
app.use((0, cors_1.default)({
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
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('<h2>Welcome</h2>');
});
app.use('/pages', page_1.default);
app.use('/subpages', subpages_1.default);
app.use('/images', images_1.default);
app.use('/pdfs', pdfs_1.default);
httpServer.listen(PORT, () => {
    console.log('[SERVER]: Server running on http://localhost:' + PORT);
});
