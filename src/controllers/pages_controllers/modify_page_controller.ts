import { Request, Response } from 'express'
import { AppDataSource } from '../../data-source';
import { Page } from '../../entities/Page.entities';

interface ModifyPageBody {
    pageName: string;
    pageContent: string;
    pageID: number;
    subpagesEnabled: boolean;
}

interface Errors {
    pageName?: string;
    pageContent?: string;
    pageID?: string;
    page?: string;
    subpagesEnabled?: string;
}

const page_repository = AppDataSource.getRepository(Page);

export default async function modify_page(req: Request, res: Response) {

    const body: ModifyPageBody = req.body;

    const pageName = body.pageName;
    const pageContent = body.pageContent;
    const pageID = body.pageID;
    const subpagesEnabled = body.subpagesEnabled;

    let errors: Errors = {};

    if(!pageName) {
        errors.pageName = "Page name must be provided"
    }
    if(!pageContent) {
        errors.pageContent = "Page content must be provided"
    }
    if(!pageID) {
        errors.pageID = "Page ID must be provided"
    }
    if(subpagesEnabled === undefined || null) {
        errors.subpagesEnabled = "Subpages option must be provided"
    }
    if(pageName.trim() === "") {
        errors.pageName = "Page name cannot be empty"
    }
    if(pageContent.trim() === "") {
        errors.pageContent = "Page content cannot be empty"
    }

    const foundPage = await page_repository.findOne({
        where: {
            id: pageID
        }
    })
    
    if(!foundPage) {
        errors.page = "Page was not found by this ID"
    }

    if(Object.keys(errors).length > 0) {
        res.send(errors)
        return
    }

    if(foundPage) {
        foundPage.pageName = pageName;
        foundPage.pageContent = pageContent;
        foundPage.subpagesEnabled = subpagesEnabled;
    }

    const modifiedPage = await page_repository.save(foundPage!);

    res.send(modifiedPage)
        
}