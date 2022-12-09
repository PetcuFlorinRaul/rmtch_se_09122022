import { Request, Response } from 'express'
import multer from 'multer'
import { AppDataSource } from '../../data-source';
import { PDF } from '../../entities/PDF.entities';

const storage = multer.diskStorage({
    destination: (req: Request, file, cb) => {
        cb(null, "PDFs")
    },
    filename: (req: Request, file, cb) => {
        console.log(file)
        cb(null, `${file.originalname}`)
    }
});

export const upload = multer({storage})

const pdfRepository = AppDataSource.getRepository(PDF);


export default async function upload_pdf(req: Request, res: Response) {
    console.log(req.file)

    const file = req.file;

    const pdf_file = {
        pdfName: file?.originalname,
        pdfSize: (file?.size! / (1024*1024)).toFixed(2) + " " + 'MB',
        pdfPath: file?.path
    }

    const newPDF = new PDF();

    newPDF.pdfName = pdf_file.pdfName!
    newPDF.pdfSize = pdf_file.pdfSize
    newPDF.pdfPath = pdf_file.pdfPath!
    newPDF.pdfLink = ""

    const savedPDF = await AppDataSource.manager.save(newPDF);

    savedPDF.pdfLink = `http://192.168.100.5:5000/pdfs/get_pdf?pdfID=${savedPDF.id}`

    const finalPDFUpload = await pdfRepository.save(savedPDF!);

    res.send(finalPDFUpload)
}