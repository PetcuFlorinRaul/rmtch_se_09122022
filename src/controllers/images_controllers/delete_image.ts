import { Request, Response } from 'express'
import { AppDataSource } from '../../data-source';
import { Image } from '../../entities/Image.entities';
import fs from 'fs'

interface ImageDeleteBody {
    imageID: number;
}

interface Errors {
    id?: string;
    image?: string;
}

const imageRepository = AppDataSource.getRepository(Image);

export default async function delete_image(req: Request, res: Response) {

    const body: ImageDeleteBody = req.body;

    let errors: Errors = {};

    const imageID = body.imageID;

    if(!imageID) {
        errors.id = "Page ID must be provided"
    }

    const foundImage = await imageRepository.findOne({
        where: {
            id: imageID
        }
    })

    if(!foundImage) {
        errors.image = "Page was not found by this ID"
    }

    if(Object.keys(errors).length > 0) {
        res.send(errors)
        return
    }
    
    const filePath = foundImage?.imagePath;

    fs.unlink(filePath!, () => {
        console.log("Image deleted")
    })

    imageRepository.delete({
        id: imageID
    })

    res.send('Image deleted')

}