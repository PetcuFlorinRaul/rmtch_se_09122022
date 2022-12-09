import { Request, Response, Router } from "express";
import create_subpage from "../controllers/subpages_controllers/create_subpage_controller";
import delete_subpage from "../controllers/subpages_controllers/delete_subpage_controller";
import find_subpage from "../controllers/subpages_controllers/find_subpage_controller";
import get_subpages from "../controllers/subpages_controllers/get_subpages_controller";
import get_subpages_for_page from "../controllers/subpages_controllers/get_subpages_for_page_controller";
import modify_subpage from "../controllers/subpages_controllers/modify_subpage_controller";


const subpages_router = Router();

subpages_router.post('/create_subpage', (req: Request, res: Response) => create_subpage(req, res))
subpages_router.post('/delete_subpage', (req: Request, res: Response) => delete_subpage(req, res))
subpages_router.get('/find_subpage', (req: Request, res: Response) => find_subpage(req, res))
subpages_router.get('/get_subpages_for_page', (req: Request, res: Response) => get_subpages_for_page(req, res))
subpages_router.get('/get_subpages', (req: Request, res: Response) => get_subpages(req, res))
subpages_router.post('/modify_subpage', (req: Request, res: Response) => modify_subpage(req, res))

export default subpages_router