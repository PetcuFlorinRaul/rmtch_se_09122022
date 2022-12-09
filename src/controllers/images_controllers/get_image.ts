import { Request, Response } from 'express'
import { AppDataSource } from '../../data-source';
import { Image } from '../../entities/Image.entities';

interface FindImageBody {
    id: number
}

interface Errors {
    id?: string;
    image?: string;
    query?: string;
}

const imageRepository = AppDataSource.getRepository(Image);

export default async function get_image(req: Request, res: Response) {
    let errors: Errors = {};

    if(!req.query.imageID) {
        errors.query = "Page query ID must be provided"
    }

    const imageID: number = Number(req.query.imageID);

    if(!imageID) {
        errors.id = "Page query ID must be provided"
    }

    const foundImage = await imageRepository.findOne({
        where: {
            id: imageID
        }
    })

    if(!foundImage) {
        errors.image = "Image was not found by this ID"
    }

    if(Object.keys(errors).length > 0) {
        res.send(errors)
        return
    }

    res.sendFile(foundImage?.imagePath!, {root: "."})

}
