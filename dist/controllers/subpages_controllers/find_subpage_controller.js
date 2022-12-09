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
function find_subpage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        let errors = {};
        const subpageID = Number(req.query.id);
        console.log(subpageID);
        if (!subpageID) {
            errors.id = "Sub page ID must be provided";
        }
        const foundSubPage = yield subpageRepository.findOne({
            where: {
                id: subpageID
            },
            relations: {
                page: true
            }
        });
        if (!foundSubPage) {
            errors.page = "Sub page was not found by this ID";
        }
        if (Object.keys(errors).length > 0) {
            res.send(errors);
            return;
        }
        res.send(foundSubPage);
    });
}
exports.default = find_subpage;
