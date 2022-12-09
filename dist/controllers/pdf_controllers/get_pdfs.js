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
function get_pdfs(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const foundPDFS = yield pdfRepository.find();
        res.send(foundPDFS);
    });
}
exports.default = get_pdfs;
