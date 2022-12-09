import { Request, Response } from 'express'
import { AppDataSource } from '../../data-source';
import { Page } from '../../entities/Page.entities'

interface PageBody {
    pageName: string;
    pageContent: string;
    subpagesEnabled: boolean;
}

interface Errors {
    pageName?: string;
    pageContent?: string;
    subpagesEnabled?: string;
}

export default async function create_page(req: Request, res: Response) {

    const body: PageBody = req.body;

    const pageName = body.pageName;
    const pageContent = body.pageContent;
    const subpagesEnabled = body.subpagesEnabled;

    let errors: Errors = {};

    if(!pageName) {
        errors.pageName = "Page name must be provided"
    }
    if(!pageContent) {
        errors.pageContent = "Page content must be provided"
    }
    if(pageName.trim() === "") {
        errors.pageName = "Page name cannot be empty"
    }
    if(pageContent.trim() === "") {
        errors.pageContent = "Page content cannot be empty"
    }
    if(subpagesEnabled === null || undefined) {
        errors.subpagesEnabled = "Subpages option must be provided"
    }

    if(Object.keys(errors).length > 0) {
        res.send(errors)
        return
    }

    const newPage = new Page();

    newPage.pageName = pageName;
    newPage.pageContent = pageContent;
    newPage.subpagesEnabled = subpagesEnabled;

    const savedPage = await AppDataSource.manager.save(newPage);

    res.send(savedPage)
        
}