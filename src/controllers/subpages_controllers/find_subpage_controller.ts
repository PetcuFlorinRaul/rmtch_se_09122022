import { Request, Response } from 'express'
import { AppDataSource } from '../../data-source';
import { Page } from '../../entities/Page.entities'
import { SubPage } from '../../entities/Subpage.entities';

interface FindSubPageBody {
    id: number;
}

interface Errors {
    id?: string;
    page?: string;
}

const subpageRepository = AppDataSource.getRepository(SubPage);

export default async function find_subpage(req: Request, res: Response) {

    const body: FindSubPageBody = req.body;

    let errors: Errors = {};

    const subpageID = Number(req.query.id);

    console.log(subpageID)

    if(!subpageID) {
        errors.id = "Sub page ID must be provided"
    }

    const foundSubPage = await subpageRepository.findOne({
        where: {
            id: subpageID
        },
        relations: {
            page: true
        }
    })
    
    if(!foundSubPage) {
        errors.page = "Sub page was not found by this ID"
    }

    if(Object.keys(errors).length > 0) {
        res.send(errors)
        return
    }

    res.send(foundSubPage)

}