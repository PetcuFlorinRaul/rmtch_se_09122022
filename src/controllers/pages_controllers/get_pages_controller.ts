import { Request, Response } from 'express';
import { AppDataSource } from '../../data-source';
import { Page } from '../../entities/Page.entities';

const pageRepository = AppDataSource.getRepository(Page);

export default async function get_pages(req: Request, res: Response) {

    const foundPages = await pageRepository.find({
        relations: {
            subPages: true
        }
    })

    res.send(foundPages)

}