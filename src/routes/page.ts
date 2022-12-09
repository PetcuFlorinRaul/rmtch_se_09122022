import { Request, Response, Router } from "express";
import create_page from "../controllers/pages_controllers/create_page_controller";
import delete_page from "../controllers/pages_controllers/delete_page_controller";
import find_page from "../controllers/pages_controllers/find_page_controller";
import modify_page from "../controllers/pages_controllers/modify_page_controller";
import get_pages from "../controllers/pages_controllers/get_pages_controller";
import get_pages_with_subpages from "../controllers/pages_controllers/get_pages_with_subpages_controller";


const pages_router = Router();

pages_router.post('/create_page', (req: Request, res: Response) => create_page(req, res))
pages_router.post('/delete_page', (req: Request, res: Response) => delete_page(req, res))
pages_router.post('/modify_page', (req: Request, res: Response) => modify_page(req, res))
pages_router.get('/find_page', (req: Request, res: Response) => find_page(req, res))
pages_router.get('/get_pages', (req: Request, res: Response) => get_pages(req, res))
pages_router.get('/get_pages_with_subpages', (req: Request, res: Response) => get_pages_with_subpages(req, res))

export default pages_router