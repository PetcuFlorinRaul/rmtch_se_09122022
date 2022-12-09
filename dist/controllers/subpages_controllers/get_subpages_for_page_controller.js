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
const subpageRepository = data_source_1.AppDataSource.getRepository(Subpage_entities_1.SubPage);
function get_subpages_for_page(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const pageID = body.pageID;
        if (!pageID) {
            const errors = {
                page: "Page ID must be provided"
            };
            res.send(errors);
            return;
        }
        const foundPages = yield subpageRepository.find({
            where: {
                page: {
                    id: pageID
                }
            },
            relations: {
                page: true
            }
        });
        res.send(foundPages);
    });
}
exports.default = get_subpages_for_page;
