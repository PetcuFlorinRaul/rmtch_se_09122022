import { Request, Response } from 'express'
import { AppDataSource } from '../../data-source';
import fs from 'fs'
import { PDF } from '../../entities/PDF.entities';

interface PDFDeleteBody {
    pdfID: number;
}

interface Errors {
    id?: string;
    pdf?: string;
}

const pdfRepository = AppDataSource.getRepository(PDF);

export default async function delete_pdf(req: Request, res: Response) {

    const body: PDFDeleteBody = req.body;

    let errors: Errors = {};

    const pdfID = body.pdfID;

    if(!pdfID) {
        errors.id = "PDF ID must be provided"
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
    
    const filePath = foundPDF?.pdfPath;

    fs.unlink(filePath!, () => {
        console.log("PDF deleted")
    })

    pdfRepository.delete({
        id: pdfID
    })

    res.send('PDF deleted')

}