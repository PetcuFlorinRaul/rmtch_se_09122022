import { Request, Response } from 'express';
import { AppDataSource } from '../../data-source';
import { Page } from '../../entities/Page.entities';

const pageRepository = AppDataSource.getRepository(Page);

export default async function get_pages(_: Request, res: Response) {

    const foundPages = await pageRepository.find({
        where: {
            subpagesEnabled: true
        }
    })

    res.send(foundPages)

}