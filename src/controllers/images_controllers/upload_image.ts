import { Request, Response } from 'express'
import multer from 'multer'
import { AppDataSource } from '../../data-source';
import { Image } from '../../entities/Image.entities';

const storage = multer.diskStorage({
    destination: (req: Request, file, cb) => {
        cb(null, "Images")
    },
    filename: (req: Request, file, cb) => {
        console.log(file)
        cb(null, `${file.originalname}`)
    }
});

export const upload = multer({storage})

const imageRepository = AppDataSource.getRepository(Image);


export default async function upload_image(req: Request, res: Response) {
    console.log(req.file)

    const file = req.file;

    const image = {
        imageName: file?.originalname,
        imageSize: (file?.size! / (1024*1024)).toFixed(2) + " " + 'MB',
        imagePath: file?.path
    }

    const newImage = new Image();

    newImage.imageName = image.imageName!
    newImage.imageSize = image.imageSize
    newImage.imagePath = image.imagePath!
    newImage.imageLink = ""

    const savedImage = await AppDataSource.manager.save(newImage);

    savedImage.imageLink = `http://192.168.100.5:5000/images/get_image?imageID=${savedImage.id}`

    const finalImageUpload = await imageRepository.save(savedImage!);

    res.send(finalImageUpload)
}