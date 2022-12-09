import { Request, Response } from 'express'
import { AppDataSource } from '../../data-source';
import { Page } from '../../entities/Page.entities';
import { SubPage } from '../../entities/Subpage.entities';

interface SubPageBody {
    subpageName: string;
    subpageContent: string;
    pageID: number
}

interface Errors {
    subpageName?: string;
    subpageContent?: string;
    page?: string;
}

const pageRepository = AppDataSource.getRepository(Page)

export default async function create_subpage(req: Request, res: Response) {

    const body: SubPageBody = req.body;

    const subpageName = body.subpageName;
    const subpageContent = body.subpageContent;
    const pageID = body.pageID

    let errors: Errors = {};

    if(!subpageName) {
        errors.subpageName = "Sub page name must be provided"
    }    
    if(!subpageContent) {
        errors.subpageContent = "Sub page content must be provided"
    }
    if(subpageName.trim() === "") {
        errors.subpageName = "Sub page name cannot be empty"
    }
    if(subpageContent.trim() === "") {
        errors.subpageContent = "Sub page content cannot be empty"
    }

    const page = await pageRepository.findOneBy({
        id: pageID
    })

    if(!page) {
        errors.page = "Primary page was not found by this ID"
    }

    if(Object.keys(errors).length > 0) {
        res.send(errors)
        return
    }

    const newSubPage = new SubPage();

    newSubPage.subPageName = subpageName;
    newSubPage.subPageContent = subpageContent;
    newSubPage.page = page!;

    const savedSubPage = await AppDataSource.manager.save(newSubPage);

    res.send(savedSubPage)
        
}