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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const data_source_1 = require("../../data-source");
const PDF_entities_1 = require("../../entities/PDF.entities");
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "PDFs");
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, `${file.originalname}`);
    }
});
exports.upload = (0, multer_1.default)({ storage });
const pdfRepository = data_source_1.AppDataSource.getRepository(PDF_entities_1.PDF);
function upload_pdf(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.file);
        const file = req.file;
        const pdf_file = {
            pdfName: file === null || file === void 0 ? void 0 : file.originalname,
            pdfSize: ((file === null || file === void 0 ? void 0 : file.size) / (1024 * 1024)).toFixed(2) + " " + 'MB',
            pdfPath: file === null || file === void 0 ? void 0 : file.path
        };
        const newPDF = new PDF_entities_1.PDF();
        newPDF.pdfName = pdf_file.pdfName;
        newPDF.pdfSize = pdf_file.pdfSize;
        newPDF.pdfPath = pdf_file.pdfPath;
        newPDF.pdfLink = "";
        const savedPDF = yield data_source_1.AppDataSource.manager.save(newPDF);
        savedPDF.pdfLink = `http://192.168.100.5:5000/pdfs/get_pdf?pdfID=${savedPDF.id}`;
        const finalPDFUpload = yield pdfRepository.save(savedPDF);
        res.send(finalPDFUpload);
    });
}
exports.default = upload_pdf;
