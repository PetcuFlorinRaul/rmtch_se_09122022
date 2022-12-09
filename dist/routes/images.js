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
const delete_image_1 = __importDefault(require("../controllers/images_controllers/delete_image"));
const get_image_1 = __importDefault(require("../controllers/images_controllers/get_image"));
const get_images_1 = __importDefault(require("../controllers/images_controllers/get_images"));
const upload_image_1 = __importStar(require("../controllers/images_controllers/upload_image"));
const images_router = (0, express_1.Router)();
images_router.post("/upload_image", upload_image_1.upload.single("image"), (req, res) => (0, upload_image_1.default)(req, res));
images_router.get("/get_image", (req, res) => (0, get_image_1.default)(req, res));
images_router.get("/get_images", (req, res) => (0, get_images_1.default)(req, res));
images_router.post('/delete_image', (req, res) => (0, delete_image_1.default)(req, res));
exports.default = images_router;
