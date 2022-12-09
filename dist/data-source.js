"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Image_entities_1 = require("./entities/Image.entities");
const Page_entities_1 = require("./entities/Page.entities");
const PDF_entities_1 = require("./entities/PDF.entities");
const Subpage_entities_1 = require("./entities/Subpage.entities");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "better-sqlite3",
    database: "./main.sqlite",
    synchronize: true,
    logging: true,
    entities: [Page_entities_1.Page, Subpage_entities_1.SubPage, Image_entities_1.Image, PDF_entities_1.PDF],
    subscribers: [],
    migrations: []
});
exports.AppDataSource.initialize()
    .then(() => {
    // console.log("Data Source has been initialized!")
})
    .catch((err) => {
    console.error("Error during Data Source initialization", err);
});
