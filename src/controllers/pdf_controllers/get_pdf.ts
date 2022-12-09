import { Request, Response } from 'express'
import { AppDataSource } from '../../data-source';
import { PDF } from '../../entities/PDF.entities';

interface Errors {
    id?: string;
    pdf?: string;
    query?: string;
}

const pdfRepository = AppDataSource.getRepository(PDF);

export default async function get_pdf(req: Request, res: Response) {
    let errors: Errors = {};

    if(!req.query.pdfID) {
        errors.query = "PDF query ID must be provided"
    }

    const pdfID: number = Number(req.query.pdfID);

    if(!pdfID) {
        errors.id = "PDF query ID must be provided"
    }

    const foundPDF = await pdfRepository.findOne({
        where: {
            id: pdfID
        }
    })

    if(!foundPDF) {
        errors.pdf = "PDF was not found by this ID"
    }

    if(Object.keys(errors).length > 0) {
        res.send(errors)
        return
    }

    res.sendFile(foundPDF?.pdfPath!, {root: "."})

}
