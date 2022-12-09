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
const page_repository = data_source_1.AppDataSource.getRepository(Page_entities_1.Page);
function modify_page(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const pageName = body.pageName;
        const pageContent = body.pageContent;
        const pageID = body.pageID;
        const subpagesEnabled = body.subpagesEnabled;
        let errors = {};
        if (!pageName) {
            errors.pageName = "Page name must be provided";
        }
        if (!pageContent) {
            errors.pageContent = "Page content must be provided";
        }
        if (!pageID) {
            errors.pageID = "Page ID must be provided";
        }
        if (subpagesEnabled === undefined || null) {
            errors.subpagesEnabled = "Subpages option must be provided";
        }
        if (pageName.trim() === "") {
            errors.pageName = "Page name cannot be empty";
        }
        if (pageContent.trim() === "") {
            errors.pageContent = "Page content cannot be empty";
        }
        const foundPage = yield page_repository.findOne({
            where: {
                id: pageID
            }
        });
        if (!foundPage) {
            errors.page = "Page was not found by this ID";
        }
        if (Object.keys(errors).length > 0) {
            res.send(errors);
            return;
        }
        if (foundPage) {
            foundPage.pageName = pageName;
            foundPage.pageContent = pageContent;
            foundPage.subpagesEnabled = subpagesEnabled;
        }
        const modifiedPage = yield page_repository.save(foundPage);
        res.send(modifiedPage);
    });
}
exports.default = modify_page;
