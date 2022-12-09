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
const data_source_1 = require("../../data-source");
const Image_entities_1 = require("../../entities/Image.entities");
const fs_1 = __importDefault(require("fs"));
const imageRepository = data_source_1.AppDataSource.getRepository(Image_entities_1.Image);
function delete_image(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        let errors = {};
        const imageID = body.imageID;
        if (!imageID) {
            errors.id = "Page ID must be provided";
        }
        const foundImage = yield imageRepository.findOne({
            where: {
                id: imageID
            }
        });
        if (!foundImage) {
            errors.image = "Page was not found by this ID";
        }
        if (Object.keys(errors).length > 0) {
            res.send(errors);
            return;
        }
        const filePath = foundImage === null || foundImage === void 0 ? void 0 : foundImage.imagePath;
        fs_1.default.unlink(filePath, () => {
            console.log("Image deleted");
        });
        imageRepository.delete({
            id: imageID
        });
        res.send('Image deleted');
    });
}
exports.default = delete_image;
