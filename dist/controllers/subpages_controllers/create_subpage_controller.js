"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../../data-source");
const Page_entities_1 = require("../../entities/Page.entities");
const Subpage_entities_1 = require("../../entities/Subpage.entities");
const pageRepository = data_source_1.AppDataSource.getRepository(Page_entities_1.Page);
function create_subpage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const subpageName = body.subpageName;
        const subpageContent = body.subpageContent;
        const pageID = body.pageID;
        let errors = {};
        if (!subpageName) {
            errors.subpageName = "Sub page name must be provided";
        }
        if (!subpageContent) {
            errors.subpageContent = "Sub page content must be provided";
        }
        if (subpageName.trim() === "") {
            errors.subpageName = "Sub page name cannot be empty";
        }
        if (subpageContent.trim() === "") {
            errors.subpageContent = "Sub page content cannot be empty";
        }
        const page = yield pageRepository.findOneBy({
            id: pageID
        });
        if (!page) {
            errors.page = "Primary page was not found by this ID";
        }
        if (Object.keys(errors).length > 0) {
            res.send(errors);
            return;
        }
        const newSubPage = new Subpage_entities_1.SubPage();
        newSubPage.subPageName = subpageName;
        newSubPage.subPageContent = subpageContent;
        newSubPage.page = page;
        const savedSubPage = yield data_source_1.AppDataSource.manager.save(newSubPage);
        res.send(savedSubPage);
    });
}
exports.default = create_subpage;
