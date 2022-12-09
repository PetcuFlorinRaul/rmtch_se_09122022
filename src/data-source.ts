import { DataSource } from 'typeorm'
import { Image } from './entities/Image.entities'
import { Page } from './entities/Page.entities'
import { PDF } from './entities/PDF.entities'
import { SubPage } from './entities/Subpage.entities'

export const AppDataSource = new DataSource({
    type: "better-sqlite3",
    database: "./main.sqlite",
    synchronize: true,
    logging: true,
    entities: [Page, SubPage, Image, PDF],
    subscribers: [],
    migrations: []
})

AppDataSource.initialize()
    .then(() => {
        // console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })