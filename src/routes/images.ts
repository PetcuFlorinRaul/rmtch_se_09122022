import { Request, Response, Router } from "express";
import delete_image from "../controllers/images_controllers/delete_image";
import get_image from "../controllers/images_controllers/get_image";
import get_images from "../controllers/images_controllers/get_images";
import upload_image, { upload } from "../controllers/images_controllers/upload_image";

const images_router = Router();

images_router.post("/upload_image", upload.single("image"), (req: Request, res: Response) => upload_image(req, res));
images_router.get("/get_image", (req: Request, res: Response) => get_image(req, res));
images_router.get("/get_images", (req: Request, res: Response) => get_images(req, res))
images_router.post('/delete_image', (req: Request, res: Response) => delete_image(req, res))


export default images_router;