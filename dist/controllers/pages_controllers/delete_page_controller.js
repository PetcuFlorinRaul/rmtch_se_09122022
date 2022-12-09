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
const subpageRepository = data_source_1.AppDataSource.getRepository(Subpage_entities_1.SubPage);
function delete_page(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        let errors = {};
        const pageID = body.pageID;
        if (!pageID) {
            errors.id = "Page ID must be provided";
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
        if (foundPage === null || foundPage === void 0 ? void 0 : foundPage.subPages) {
            if (foundPage.subPages.length > 0) {
                foundPage.subPages.map((subpage) => {
                    subpageRepository.delete({
                        id: subpage.id
                    });
                });
            }
        }
        pageRepository.delete({
            id: pageID
        });
        res.send('Page deleted');
    });
}
exports.default = delete_page;
