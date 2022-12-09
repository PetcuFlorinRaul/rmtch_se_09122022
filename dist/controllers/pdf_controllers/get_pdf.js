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
const PDF_entities_1 = require("../../entities/PDF.entities");
const pdfRepository = data_source_1.AppDataSource.getRepository(PDF_entities_1.PDF);
function get_pdf(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let errors = {};
        if (!req.query.pdfID) {
            errors.query = "PDF query ID must be provided";
        }
        const pdfID = Number(req.query.pdfID);
        if (!pdfID) {
            errors.id = "PDF query ID must be provided";
        }
        const foundPDF = yield pdfRepository.findOne({
            where: {
                id: pdfID
            }
        });
        if (!foundPDF) {
            errors.pdf = "PDF was not found by this ID";
        }
        if (Object.keys(errors).length > 0) {
            res.send(errors);
            return;
        }
        res.sendFile(foundPDF === null || foundPDF === void 0 ? void 0 : foundPDF.pdfPath, { root: "." });
    });
}
exports.default = get_pdf;
