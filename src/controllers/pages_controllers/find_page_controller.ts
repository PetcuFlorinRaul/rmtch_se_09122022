import { Request, Response } from 'express'
import { AppDataSource } from '../../data-source';
import { Page } from '../../entities/Page.entities'

interface FindPageBody {
    id: number;
}

interface Errors {
    id?: string;
    page?: string;
    query?: string;
}

const pageRepository = AppDataSource.getRepository(Page);

export default async function find_page(req: Request, res: Response) {

    
    let errors: Errors = {};

    if(!req.query.pageID) {
        errors.query = "Page query ID must be provided"
    }
    
    const pageID: number = Number(req.query.pageID);

    if(!pageID) {
        errors.id = "Page query ID must be provided"
    }
    
    const foundPage = await pageRepository.findOne({
        where: {
            id: pageID
        },
        relations: {
            subPages: true
        }
    })
    
    if(!foundPage) {
        errors.page = "Page was not found by this ID"
    }

    if(Object.keys(errors).length > 0) {
        res.send(errors)
        return
    }

    res.send(foundPage)

}