import { Request, Response } from 'express'
import { AppDataSource } from '../../data-source';
import { SubPage } from '../../entities/Subpage.entities';

interface ModifySubPageBody {
    subpageName: string;
    subpageContent: string;
    subpageID: number;
    pageID: number;
}

interface Errors {
    subpageName?: string;
    subpageContent?: string;
    subpageID?: string;
    pageID?: string;
    subpage?: string;
}

const subpage_repository = AppDataSource.getRepository(SubPage);

export default async function modify_subpage(req: Request, res: Response) {

    const body: ModifySubPageBody = req.body;

    const subpageName = body.subpageName;
    const subpageContent = body.subpageContent;
    const subpageID = body.subpageID;
    const pageID = body.pageID;

    let errors: Errors = {};

    if(!subpageName) {
        errors.subpageName = "Sub page name must be provided"
    }
    if(!pageID) {
        errors.pageID = "Page ID must be provided"
    }
    if(!subpageContent) {
        errors.subpageContent = "Sub page content must be provided"
    }
    if(!pageID) {
        errors.pageID = "Page ID must be provided"
    }
    if(subpageName.trim() === "") {
        errors.subpageName = "Sub page name cannot be empty"
    }
    if(subpageContent.trim() === "") {
        errors.subpageContent = "Sub page content cannot be empty"
    }

    const foundSubPage = await subpage_repository.findOne({
        where: {
            id: subpageID
        },
        relations: {
            page: true
        }
    })
    
    if(!foundSubPage) {
        errors.subpage = "Page was not found by this ID"
    }

    if(Object.keys(errors).length > 0) {
        res.send(errors)
        return
    }

    if(foundSubPage) {
        foundSubPage.subPageName = subpageName;
        foundSubPage.subPageContent = subpageContent;
        foundSubPage.page.id = pageID;
    }

    const modifiedSubPage = await subpage_repository.save(foundSubPage!);

    res.send(modifiedSubPage)
        
}