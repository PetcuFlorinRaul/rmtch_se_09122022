import e, { Request, Response } from 'express'
import { AppDataSource } from '../../data-source';
import { Page } from '../../entities/Page.entities'
import { SubPage } from '../../entities/Subpage.entities';

interface PageDeleteBody {
    pageID: number;
}

interface Errors {
    id?: string;
    page?: string;
}

const pageRepository = AppDataSource.getRepository(Page);
const subpageRepository = AppDataSource.getRepository(SubPage);

export default async function delete_page(req: Request, res: Response) {

    const body: PageDeleteBody = req.body;

    let errors: Errors = {};

    const pageID = body.pageID;

    if(!pageID) {
        errors.id = "Page ID must be provided"
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

    if(foundPage?.subPages) {
        if(foundPage.subPages.length > 0) {
            foundPage.subPages.map((subpage: SubPage) => {
                subpageRepository.delete({
                    id: subpage.id
                })
            })
        }
    }

    pageRepository.delete({
        id: pageID
    })

    res.send('Page deleted')

}