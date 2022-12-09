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
const Image_entities_1 = require("../../entities/Image.entities");
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Images");
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, `${file.originalname}`);
    }
});
exports.upload = (0, multer_1.default)({ storage });
const imageRepository = data_source_1.AppDataSource.getRepository(Image_entities_1.Image);
function upload_image(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.file);
        const file = req.file;
        const image = {
            imageName: file === null || file === void 0 ? void 0 : file.originalname,
            imageSize: ((file === null || file === void 0 ? void 0 : file.size) / (1024 * 1024)).toFixed(2) + " " + 'MB',
            imagePath: file === null || file === void 0 ? void 0 : file.path
        };
        const newImage = new Image_entities_1.Image();
        newImage.imageName = image.imageName;
        newImage.imageSize = image.imageSize;
        newImage.imagePath = image.imagePath;
        newImage.imageLink = "";
        const savedImage = yield data_source_1.AppDataSource.manager.save(newImage);
        savedImage.imageLink = `http://192.168.100.5:5000/images/get_image?imageID=${savedImage.id}`;
        const finalImageUpload = yield imageRepository.save(savedImage);
        res.send(finalImageUpload);
    });
}
exports.default = upload_image;
