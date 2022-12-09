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
function create_page(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const pageName = body.pageName;
        const pageContent = body.pageContent;
        const subpagesEnabled = body.subpagesEnabled;
        let errors = {};
        if (!pageName) {
            errors.pageName = "Page name must be provided";
        }
        if (!pageContent) {
            errors.pageContent = "Page content must be provided";
        }
        if (pageName.trim() === "") {
            errors.pageName = "Page name cannot be empty";
        }
        if (pageContent.trim() === "") {
            errors.pageContent = "Page content cannot be empty";
        }
        if (subpagesEnabled === null || undefined) {
            errors.subpagesEnabled = "Subpages option must be provided";
        }
        if (Object.keys(errors).length > 0) {
            res.send(errors);
            return;
        }
        const newPage = new Page_entities_1.Page();
        newPage.pageName = pageName;
        newPage.pageContent = pageContent;
        newPage.subpagesEnabled = subpagesEnabled;
        const savedPage = yield data_source_1.AppDataSource.manager.save(newPage);
        res.send(savedPage);
    });
}
exports.default = create_page;
