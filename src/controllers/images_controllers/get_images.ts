import { Request, Response } from 'express';
import { AppDataSource } from '../../data-source';
import { Image } from '../../entities/Image.entities';

const imageRepository = AppDataSource.getRepository(Image);

export default async function get_images(req: Request, res: Response) {

    const foundImages = await imageRepository.find()

    res.send(foundImages)

}