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
const pageRepository = data_source_1.AppDataSource.getRepository(Page_entities_1.Page);
function find_page(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let errors = {};
        if (!req.query.pageID) {
            errors.query = "Page query ID must be provided";
        }
        const pageID = Number(req.query.pageID);
        if (!pageID) {
            errors.id = "Page query ID must be provided";
        }
        const foundPage = yield pageRepository.findOne({
            where: {
                id: pageID
            },
            relations: {
                subPages: true
            }
        });
        if (!foundPage) {
            errors.page = "Page was not found by this ID";
        }
        if (Object.keys(errors).length > 0) {
            res.send(errors);
            return;
        }
        res.send(foundPage);
    });
}
exports.default = find_page;
