"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const delete_pdf_1 = __importDefault(require("../controllers/pdf_controllers/delete_pdf"));
const get_pdf_1 = __importDefault(require("../controllers/pdf_controllers/get_pdf"));
const get_pdfs_1 = __importDefault(require("../controllers/pdf_controllers/get_pdfs"));
const upload_pdf_1 = __importStar(require("../controllers/pdf_controllers/upload_pdf"));
const pdfs_router = (0, express_1.Router)();
pdfs_router.post("/upload_pdf", upload_pdf_1.upload.single("pdf"), (req, res) => (0, upload_pdf_1.default)(req, res));
pdfs_router.get("/get_pdf", (req, res) => (0, get_pdf_1.default)(req, res));
pdfs_router.get("/get_pdfs", (req, res) => (0, get_pdfs_1.default)(req, res));
pdfs_router.post('/delete_pdf', (req, res) => (0, delete_pdf_1.default)(req, res));
exports.default = pdfs_router;
