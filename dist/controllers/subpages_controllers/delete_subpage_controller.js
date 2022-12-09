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
function delete_subpage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        let errors = {};
        const subpageID = body.subpageID;
        if (!subpageID) {
            errors.id = "Sub page ID must be provided";
        }
        const foundPage = yield subpageRepository.findOne({
            where: {
                id: subpageID
            }
        });
        if (!foundPage) {
            errors.subpage = "Sub page was not found by this ID";
        }
        if (Object.keys(errors).length > 0) {
            res.send(errors);
            return;
        }
        subpageRepository.delete({
            id: subpageID
        });
        res.send('Sub page deleted');
    });
}
exports.default = delete_subpage;
