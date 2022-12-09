import { Request, Response, Router } from "express";
import delete_pdf from "../controllers/pdf_controllers/delete_pdf";
import get_pdf from "../controllers/pdf_controllers/get_pdf";
import get_pdfs from "../controllers/pdf_controllers/get_pdfs";
import upload_pdf, { upload } from "../controllers/pdf_controllers/upload_pdf";

const pdfs_router = Router();

pdfs_router.post("/upload_pdf", upload.single("pdf"), (req: Request, res: Response) => upload_pdf(req, res));
pdfs_router.get("/get_pdf", (req: Request, res: Response) => get_pdf(req, res));
pdfs_router.get("/get_pdfs", (req: Request, res: Response) => get_pdfs(req, res))
pdfs_router.post('/delete_pdf', (req: Request, res: Response) => delete_pdf(req, res))


export default pdfs_router;