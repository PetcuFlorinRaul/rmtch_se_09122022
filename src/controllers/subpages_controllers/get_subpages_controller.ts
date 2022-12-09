import { Request, Response } from 'express';
import { AppDataSource } from '../../data-source';
import { SubPage } from '../../entities/Subpage.entities';

const subpageRepository = AppDataSource.getRepository(SubPage);

export default async function get_subpages(_: Request, res: Response) {

    const foundPages = await subpageRepository.find({
        relations: {
            page: true
        }
    })

    res.send(foundPages)

}