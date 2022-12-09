import { Request, Response } from 'express'
import { AppDataSource } from '../../data-source';
import { SubPage } from '../../entities/Subpage.entities';

interface SubPageDeleteBody {
    subpageID: number;
}

interface Errors {
    id?: string;
    subpage?: string;
}

const subpageRepository = AppDataSource.getRepository(SubPage);

export default async function delete_subpage(req: Request, res: Response) {

    const body: SubPageDeleteBody = req.body;

    let errors: Errors = {};

    const subpageID = body.subpageID;

    if(!subpageID) {
        errors.id = "Sub page ID must be provided"
    }

    const foundPage = await subpageRepository.findOne({
        where: {
            id: subpageID
        }
    })

    if(!foundPage) {
        errors.subpage = "Sub page was not found by this ID"
    }

    if(Object.keys(errors).length > 0) {
        res.send(errors)
        return
    }

    subpageRepository.delete({
        id: subpageID
    })

    res.send('Sub page deleted')

}