import { Request, Response } from 'express';
import { AppDataSource } from '../../data-source';
import { SubPage } from '../../entities/Subpage.entities';

const subpageRepository = AppDataSource.getRepository(SubPage);

export default async function get_subpages_for_page(req: Request, res: Response) {

    const body: {pageID: number} = req.body;

    const pageID = body.pageID;

    if(!pageID) {
        const errors = {
            page: "Page ID must be provided"
        }
        res.send(errors)
        return
    }

    const foundPages = await subpageRepository.find({
        where: {
            page: {
                id: pageID
            }
        },
        relations: {
            page: true
        }
    })

    res.send(foundPages)

}