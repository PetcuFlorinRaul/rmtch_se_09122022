import { Request, Response } from 'express';
import { AppDataSource } from '../../data-source';
import { PDF } from '../../entities/PDF.entities';

const pdfRepository = AppDataSource.getRepository(PDF);

export default async function get_pdfs(req: Request, res: Response) {

    const foundPDFS = await pdfRepository.find()

    res.send(foundPDFS)

}