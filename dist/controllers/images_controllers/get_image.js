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
const Image_entities_1 = require("../../entities/Image.entities");
const imageRepository = data_source_1.AppDataSource.getRepository(Image_entities_1.Image);
function get_image(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let errors = {};
        if (!req.query.imageID) {
            errors.query = "Page query ID must be provided";
        }
        const imageID = Number(req.query.imageID);
        if (!imageID) {
            errors.id = "Page query ID must be provided";
        }
        const foundImage = yield imageRepository.findOne({
            where: {
                id: imageID
            }
        });
        if (!foundImage) {
            errors.image = "Image was not found by this ID";
        }
        if (Object.keys(errors).length > 0) {
            res.send(errors);
            return;
        }
        res.sendFile(foundImage === null || foundImage === void 0 ? void 0 : foundImage.imagePath, { root: "." });
    });
}
exports.default = get_image;
