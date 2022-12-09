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
const Subpage_entities_1 = require("../../entities/Subpage.entities");
const subpage_repository = data_source_1.AppDataSource.getRepository(Subpage_entities_1.SubPage);
function modify_subpage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const subpageName = body.subpageName;
        const subpageContent = body.subpageContent;
        const subpageID = body.subpageID;
        const pageID = body.pageID;
        let errors = {};
        if (!subpageName) {
            errors.subpageName = "Sub page name must be provided";
        }
        if (!pageID) {
            errors.pageID = "Page ID must be provided";
        }
        if (!subpageContent) {
            errors.subpageContent = "Sub page content must be provided";
        }
        if (!pageID) {
            errors.pageID = "Page ID must be provided";
        }
        if (subpageName.trim() === "") {
            errors.subpageName = "Sub page name cannot be empty";
        }
        if (subpageContent.trim() === "") {
            errors.subpageContent = "Sub page content cannot be empty";
        }
        const foundSubPage = yield subpage_repository.findOne({
            where: {
                id: subpageID
            },
            relations: {
                page: true
            }
        });
        if (!foundSubPage) {
            errors.subpage = "Page was not found by this ID";
        }
        if (Object.keys(errors).length > 0) {
            res.send(errors);
            return;
        }
        if (foundSubPage) {
            foundSubPage.subPageName = subpageName;
            foundSubPage.subPageContent = subpageContent;
            foundSubPage.page.id = pageID;
        }
        const modifiedSubPage = yield subpage_repository.save(foundSubPage);
        res.send(modifiedSubPage);
    });
}
exports.default = modify_subpage;
